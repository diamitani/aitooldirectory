#!/usr/bin/env python3
"""Build assets/data.js from the legacy CSV archive and the curated 2026 dataset.

Usage: python3 scripts/build_data.py
"""
import csv
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LEGACY_CSV = ROOT / "data" / "ai_tools_legacy.csv"
CURATED_JSON = ROOT / "data" / "tools_2026.json"
OUT_JS = ROOT / "assets" / "data.js"

# Map noisy legacy categories to the site's taxonomy.
LEGACY_CATEGORY_MAP = {
    "LLM / Chatbot": "LLMs & Assistants",
    "Video / Image": "Video & Image",
    "Marketing / SEO": "Marketing & Growth",
    "Creative Tools": "Creative Tools",
    "Education": "Learning & Resources",
    "Productivity / Automation": "Automation & Agents",
    "Document / Data": "Data & Docs",
    "Developer Tools": "Dev Infrastructure",
    "Finance": "General",
    "Healthcare": "General",
    "General / Other": "General",
}

MAX_LEGACY_DESC = 320


def clean_description(text: str) -> str:
    text = re.sub(r"^\s*DESCRIPTION:\s*", "", text or "", flags=re.I)
    text = re.sub(r"\s+", " ", text).strip()
    if len(text) > MAX_LEGACY_DESC:
        cut = text[:MAX_LEGACY_DESC]
        # Cut at the last sentence end, else last word boundary.
        m = re.search(r"^(.+[.!?])\s", cut)
        text = m.group(1) if m else cut.rsplit(" ", 1)[0] + "…"
    return text


def clean_name(name: str) -> str:
    name = re.sub(r"\s+", " ", (name or "").strip())
    # Legacy names are often SHOUTING; title-case anything fully uppercased.
    if len(name) > 3 and name.isupper():
        name = name.title()
    return name


def norm_key(name: str, url: str) -> str:
    host = re.sub(r"^https?://(www\.)?", "", (url or "").lower()).split("/")[0]
    return re.sub(r"[^a-z0-9]", "", name.lower()) + "|" + host


def load_curated() -> list[dict]:
    data = json.loads(CURATED_JSON.read_text(encoding="utf-8"))
    tools = []
    for t in data["tools"]:
        tools.append({
            "name": t["name"],
            "url": t["url"],
            "tagline": t["tagline"],
            "description": t["description"],
            "category": t["category"],
            "pricing": t["pricing"],
            "tags": t.get("tags", []),
            "featured": bool(t.get("featured")),
            "personas": t.get("personas", []),
            "era": "2026",
        })
    return tools


def load_legacy(skip_keys: set[str]) -> list[dict]:
    tools = []
    seen = set()
    with LEGACY_CSV.open(encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            name = clean_name(row.get("Name", ""))
            url = (row.get("URL") or "").strip()
            if not name or not url:
                continue
            key = norm_key(name, url)
            if key in skip_keys or key in seen:
                continue
            seen.add(key)
            tools.append({
                "name": name,
                "url": url,
                "tagline": "",
                "description": clean_description(row.get("Description", "")),
                "category": LEGACY_CATEGORY_MAP.get(
                    (row.get("Category") or "").strip(), "General"),
                "pricing": "",
                "tags": [],
                "featured": False,
                "personas": [],
                "era": "archive",
            })
    return tools


def main() -> None:
    curated = load_curated()
    curated_keys = {norm_key(t["name"], t["url"]) for t in curated}
    # Also skip legacy rows whose bare name matches a curated tool.
    curated_names = {re.sub(r"[^a-z0-9]", "", t["name"].lower()) for t in curated}

    legacy = load_legacy(curated_keys)
    legacy = [
        t for t in legacy
        if re.sub(r"[^a-z0-9]", "", t["name"].lower()) not in curated_names
    ]

    payload = {
        "updated": json.loads(CURATED_JSON.read_text(encoding="utf-8"))["meta"]["updated"],
        "tools": curated + legacy,
    }
    OUT_JS.parent.mkdir(parents=True, exist_ok=True)
    js = "window.DIRECTORY_DATA = " + json.dumps(
        payload, ensure_ascii=False, separators=(",", ":")) + ";\n"
    OUT_JS.write_text(js, encoding="utf-8")
    print(f"curated: {len(curated)}  legacy: {len(legacy)}  total: {len(payload['tools'])}")
    print(f"wrote {OUT_JS} ({OUT_JS.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
