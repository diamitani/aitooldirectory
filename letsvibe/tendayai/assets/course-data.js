/* TenDayAI - Interactive AI Course content
   First-party course by Patrick Diamitani / LetsVibeAI.
   Content modules: heading | subheading | paragraph | list | numbered-list | prompt | tip | congrats
   Text fields may contain limited inline HTML (strong/em) - content is first-party and trusted. */
window.TENDAY_COURSE = {
  title: "TenDayAI: Interactive AI Course",
  tagline: "Build Custom GPTs, automations, and AI apps in 10 days - learn by doing.",
  updated: "2026-07",
  days: [
    {
      day: 1,
      title: "Introduction to Custom GPTs",
      objective: "Understand the fundamentals of Custom GPTs and learn how to access the tools needed to build them.",
      content: [
        { type: "heading", text: "Welcome to Your 10-Day Journey to AI Mastery" },
        { type: "paragraph", text: "Welcome to TenDayAI, an intensive, hands-on learning experience designed to transform you into a capable AI solutions builder in just 10 days. Forget dense theory and abstract concepts; here, you will learn by doing." },
        { type: "subheading", text: "The TenDayAI Philosophy" },
        { type: "list", items: [
          "<strong>Chain Prompting:</strong> A powerful technique that breaks down complex AI development into a series of simple, manageable, and interconnected prompts.",
          "<strong>Project-Based Learning:</strong> You won't just be learning; you'll be building tangible projects that solve real-world problems.",
          "<strong>Rapid Skill Development:</strong> An intensive sprint where each day's lesson builds directly on the last, creating powerful learning momentum."
        ]},
        { type: "subheading", text: "Key Benefits of Custom GPTs" },
        { type: "list", items: [
          "Specialized Knowledge: Train your GPT on your own data (PDFs, text files, etc.).",
          "Consistent Behavior: Define a specific tone, style, and set of rules for its responses.",
          "Extended Capabilities: Enable web browsing, image generation, and data analysis.",
          "No-Code Solution: Build powerful tools without any programming."
        ]},
        { type: "subheading", text: "Your First Steps: Accessing the GPT Builder" },
        { type: "numbered-list", items: [
          "Log in to your ChatGPT account (you must have a Plus subscription).",
          "In the top-left corner of the sidebar, click on \"Explore GPTs\".",
          "In the top-right corner of the \"My GPTs\" page, click \"Create\"."
        ]}
      ]
    },
    {
      day: 2,
      title: "The Chain Prompting Method",
      objective: "Learn the structured Chain Prompting workflow to design the 'soul' of your Custom GPT.",
      content: [
        { type: "heading", text: "The Chain Prompting Process" },
        { type: "paragraph", text: "Instead of staring at a blank 'Instructions' box, we'll use a structured process. Chain Prompting uses a series of specialized AI assistants to generate the core components of our assistant." },
        { type: "numbered-list", items: [
          "Define Your GPT's Purpose: Get a clear idea of the problem your GPT will solve.",
          "Generate System Instructions: Use an 'Instruction Architect' to create comprehensive instructions.",
          "Build a Knowledge Base: Use a 'Knowledge Base Architect' to find and structure information.",
          "Define Functions (Optional): Define how your assistant can connect to external tools and APIs."
        ]},
        { type: "subheading", text: "Let's Walk Through It: The Chain Prompting Wizard" },
        { type: "tip", text: "For our project, we'll define our GPT's purpose as: GPT Name: AI Content Writer. Description: A professional writing assistant that helps create high-quality blog posts, social media content, and marketing copy." },
        { type: "prompt",
          id: "instruction_architect",
          title: "Step 2: Create System Instructions with Instruction Architect",
          description: "Use the prompt below to generate comprehensive system instructions for our 'AI Content Writer'. This simulates using a specialized GPT to define the core behavior of another AI.",
          prompt: "I am creating a GPT called \"AI Content Writer.\" Its purpose is to be a professional writing assistant that helps create high-quality blog posts, social media content, and marketing copy based on a specific brand voice and content templates.\n\nPlease generate comprehensive system instructions for this assistant. The instructions should include:\n1. A clear definition of the GPT's role and identity.\n2. The specific purpose and tasks it should perform.\n3. The tone and style it should use (professional, creative, witty).\n4. A detailed workflow for how it should approach user requests (e.g., ask for topic, target audience, desired format, then generate content).\n5. Any limitations or boundaries it should observe (e.g., do not create content on sensitive topics).\n6. The preferred output format for its responses (e.g., use Markdown for formatting)."
        }
      ]
    },
    {
      day: 3,
      title: "Build and Publish Your AI Content Writer",
      objective: "Assemble, test, and publish your first Custom GPT using the assets generated.",
      content: [
        { type: "prompt",
          id: "knowledge_base_architect",
          title: "Step 3: Build the Knowledge Base with Knowledge Base Architect",
          description: "Now, let's generate a list of potential knowledge sources for our 'AI Content Writer'. In a real project, you would upload content from these sources. Here, we'll just generate the list.",
          prompt: "I am building an \"AI Content Writer\" GPT. Please create a list of 5 high-quality knowledge sources that would make this GPT more effective. It needs to be an expert in copywriting, SEO best practices, and creating engaging social media content.\n\nFor each resource, provide:\n1. Title\n2. Source Type (e.g., Blog, Guide)\n3. A brief description of its content\n4. The URL\n5. Why it is valuable for this specific GPT.\n\nFormat the output as a markdown table."
        },
        { type: "subheading", text: "Combine the Assets" },
        { type: "paragraph", text: "With the system instructions from Day 2 and the knowledge sources from today, you can now build your GPT." },
        { type: "numbered-list", items: [
          "Open the GPT Builder and go to the \"Configure\" tab.",
          "Name and Description: Fill in the AI Content Writer name and description.",
          "Instructions: Paste the detailed system instructions you generated.",
          "Conversation Starters: Add helpful prompts like \"Write a blog post about...\".",
          "Knowledge: Upload files based on your knowledge base research.",
          "Capabilities: Ensure Web Browsing and DALL-E Image Generation are checked.",
          "Test in the Preview Pane: Interact with your GPT to see if it follows instructions.",
          "Iterate and Refine: Tweak instructions based on test results.",
          "Save and Publish: Click \"Save\" and choose your publishing option."
        ]},
        { type: "congrats", text: "Congratulations! You have successfully designed and built your first Custom GPT using a structured, professional workflow." }
      ]
    },
    {
      day: 4,
      title: "The Power of Automation",
      objective: "Understand the fundamentals of automation and its importance in scaling AI capabilities.",
      content: [
        { type: "heading", text: "Why Automation Matters for AI" },
        { type: "paragraph", text: "Your AI assistants are powerful, but they are most effective when connected to the other tools you use every day. Automation is the digital glue that makes this possible, allowing you to create workflows that pass data between applications, trigger actions, and run complex processes without any manual effort." },
        { type: "list", items: [
          "<strong>Connect AI to Your World:</strong> Feed data from forms, emails, or CRMs into your AI, and send the AI-generated output to documents, databases, or marketing platforms.",
          "<strong>Scale Your AI:</strong> Go from processing one task at a time to processing thousands automatically.",
          "<strong>Create End-to-End Solutions:</strong> Chain multiple services together. For example: a new email triggers a GPT to draft a reply, which is then saved to a Google Doc for review."
        ]},
        { type: "subheading", text: "Platform Comparison" },
        { type: "list", items: [
          "<strong>Make.com (Our Choice):</strong> A highly visual and powerful platform with a generous free tier. Excellent for complex workflows and data transformation.",
          "<strong>Zapier:</strong> Extremely user-friendly with a vast number of integrations. Great for beginners and simpler workflows.",
          "<strong>n8n:</strong> An open-source option that can be self-hosted, offering maximum control and privacy. Best for technical users."
        ]}
      ]
    },
    {
      day: 5,
      title: "Mastering Make.com",
      objective: "Learn the core concepts of Make.com and build your first automated workflow.",
      content: [
        { type: "heading", text: "Core Concepts of Make.com" },
        { type: "list", items: [
          "<strong>Scenarios:</strong> A scenario is a complete workflow. It's the visual canvas where you build your automation.",
          "<strong>Modules:</strong> These are the building blocks of a scenario. Each module represents an app (like Gmail, Google Sheets, or an AI model) and performs a specific function (Trigger, Action, or Search).",
          "<strong>Connections:</strong> The links between modules that show how data (called \"bundles\") flows."
        ]},
        { type: "subheading", text: "Mini-Tutorial: The AI News Summarizer" },
        { type: "paragraph", text: "Let's simulate building an automation that monitors a news RSS feed, uses our AI to summarize new articles, and emails the summary to us. The prompt below simulates the AI step of this workflow." },
        { type: "prompt",
          id: "news_summarizer",
          title: "Step 2: The AI Action",
          description: "This simulates the AI module in a Make.com scenario. It takes the title and description from an RSS feed item and generates a concise summary.",
          prompt: "Please summarize the following article in 3 key bullet points.\n\nTitle: \"Global Tech Summit 2024 Unveils Breakthroughs in Quantum Computing\"\nContent: \"The annual Global Tech Summit concluded today, leaving attendees buzzing with excitement over several groundbreaking announcements. The highlight was a presentation from QuantumLeap Inc., which demonstrated a new qubit stabilization technique that promises to dramatically reduce error rates in quantum computers. This development could accelerate the timeline for commercially viable quantum machines. Other major news included the launch of a new open-source AI framework for drug discovery and a partnership between major auto manufacturers to standardize data formats for autonomous vehicles.\""
        }
      ]
    },
    {
      day: 6,
      title: "Designing Automations with Chain Prompting",
      objective: "Apply the Chain Prompting method to design a more complex automation.",
      content: [
        { type: "heading", text: "Project: Social Media Monitor" },
        { type: "paragraph", text: "Goal: Create an automation that monitors Twitter for mentions of a company, analyzes the sentiment using AI, and sends a daily summary to a Slack channel." },
        { type: "prompt",
          id: "automation_architect",
          title: "Step 2: Design with Automation Architect",
          description: "We use a specialized 'Automation Architect' to design the workflow. This AI will provide a step-by-step plan for building the scenario in Make.com.",
          prompt: "I need to design an automation workflow in Make.com. Here is the goal:\n1. It should monitor Twitter for mentions of \"TenDayAI\".\n2. It should take each mention and use an AI to analyze its sentiment (Positive, Negative, Neutral).\n3. It should then post the original tweet content and its sentiment into a specific Slack channel called #mentions.\n\nPlease provide a step-by-step implementation plan for Make.com, including:\n- The specific modules to use for each step (e.g., Twitter > AI Model > Slack).\n- How to configure the modules.\n- How to map the data between the modules.\n- Any suggestions for error handling.\n\nFormat the output clearly with numbered steps."
        }
      ]
    },
    {
      day: 7,
      title: "Architecting Production-Ready AI Assistants",
      objective: "Learn the four-phase process for building a deployable, production-ready AI Assistant using an Assistants API.",
      content: [
        { type: "heading", text: "The Four Phases of Assistant Building" },
        { type: "numbered-list", items: [
          "<strong>Define (Chain Prompting):</strong> Design the assistant's \"soul\" (purpose, personality, tools).",
          "<strong>Deploy (AI Platform):</strong> Create the assistant on the AI provider's platform.",
          "<strong>Bundle (Assets):</strong> Prepare all materials for development (e.g., PRD).",
          "<strong>Build (Application):</strong> Build the front-end and back-end application that interacts with the assistant."
        ]},
        { type: "subheading", text: "Phase 1: Define Your Assistant's Master Prompt" },
        { type: "paragraph", text: "This phase is very similar to how we built our Custom GPT, but more rigorous. We create a 'Master Prompt' that defines the assistant's vision." },
        { type: "prompt",
          id: "master_prompt_instructions",
          title: "Project: Customer Support Bot",
          description: "Based on a high-level idea, we generate the detailed instructions for the assistant. This is the 'Define' phase.",
          prompt: "Based on the following Master Prompt Idea, generate a detailed set of instructions for an AI Assistant.\n\nMaster Prompt Idea: \"You are an AI Assistant for the company 'TenDayAI'. Your role is to provide first-line customer support. You will answer common questions based on your knowledge base. If you cannot answer a question or if the customer is frustrated, you will escalate the issue to a human agent by providing them with a support ticket link.\""
        },
        { type: "subheading", text: "Phase 2: Deploy on an AI Platform" },
        { type: "paragraph", text: "After defining the instructions, you would navigate to your AI provider's 'Assistants' tab, create a new assistant, and configure it using the generated instructions, enabling tools like 'Retrieval' and uploading knowledge files." }
      ]
    },
    {
      day: 8,
      title: "Building and Deploying Your Assistant",
      objective: "Understand how to bundle development assets and build an application that uses your new AI assistant.",
      content: [
        { type: "heading", text: "Phase 3: Bundle Assets for Development" },
        { type: "paragraph", text: "Before building the app, we prepare our materials. The most important document is a Product Requirements Document (PRD). We also create Developer Prompts for an AI-powered coding tool to help write the code." },
        { type: "subheading", text: "Phase 4: Build and Deploy Your Application" },
        { type: "paragraph", text: "This is where the assistant gets a 'body'-a user interface. The following prompt is an example of what we'd give to an AI coding assistant to generate the UI." },
        { type: "prompt",
          id: "developer_prompt",
          title: "Example Developer Prompt",
          description: "This prompt asks an AI to generate the code for a user interface. Paste it into your AI coding tool of choice and inspect the result.",
          prompt: "Generate the HTML and CSS code for a simple web chat interface.\nIt should have:\n1. A main container with a dark theme.\n2. A chat window area with a slightly lighter background to display messages.\n3. A message list that can show messages from the 'User' and the 'Assistant'.\n4. An input area at the bottom with a text field and a 'Send' button.\nMake it look clean and modern. Do not include any JavaScript, only HTML and a <style> tag for the CSS."
        }
      ]
    },
    {
      day: 9,
      title: "Simplified Web App Development",
      objective: "Learn how to build a web application interface quickly and efficiently using an AI-powered tool.",
      content: [
        { type: "heading", text: "The Web App Chain Prompting Wizard" },
        { type: "paragraph", text: "This is a simplified version of our Chain Prompting method, tailored for building UIs. For our final project, we'll design a portfolio website." },
        { type: "subheading", text: "Step 1: Define Purpose" },
        { type: "tip", text: "Application Name: My AI Portfolio. Description: A clean, professional, single-page website to showcase the AI projects I've built during the TenDayAI course." },
        { type: "prompt",
          id: "hsp_prompt",
          title: "Step 2: Define Requirements with Highly Suggested Prompts (HSP)",
          description: "We use a specialized GPT to help us flesh out the details by asking targeted questions. Here, we simulate that interaction.",
          prompt: "I want to create a web application with the following purpose: A clean, professional, single-page website to showcase the AI projects I've built.\n\nPlease help me by asking 3-4 targeted questions to clarify the requirements for:\n1. The core features needed for an MVP.\n2. The user experience and interface considerations.\n3. The overall design direction and recommendations (e.g., color scheme, layout)."
        }
      ]
    },
    {
      day: 10,
      title: "From Prompt to Production",
      objective: "Use a 'Prompt Builder' to generate, customize, and deploy your final project.",
      content: [
        { type: "heading", text: "Final Project: AI Web Application" },
        { type: "paragraph", text: "By following the process, you can create a stunning, professional portfolio website to showcase your new AI development skills, all without writing code from scratch." },
        { type: "prompt",
          id: "v0_prompt_builder",
          title: "Step 3: Create UI Prompts with a Prompt Builder",
          description: "Based on requirements, a 'Prompt Builder' AI creates optimized text prompts for a UI generation tool like v0.dev. Let's simulate this.",
          prompt: "I'm planning to build a web application. Here's a summary of my requirements: \"The site should have a hero section with a headline, a grid-based portfolio section, and a simple footer. The design should be minimalist with a dark theme.\"\n\nBased on this, please create a v0.dev prompt that will generate the key component: a responsive hero section. The prompt should be specific and detailed."
        },
        { type: "subheading", text: "Step 4: Generate, Assemble, and Deploy" },
        { type: "numbered-list", items: [
          "Paste Prompts: Enter the generated prompts one by one into an AI UI builder.",
          "Get the Code: Once you are happy with a component, you copy the React code.",
          "Assemble and Deploy: Assemble the components in a development environment and deploy the final application."
        ]},
        { type: "congrats", text: "Course Conclusion: Over the last 10 days, you have journeyed from a beginner to a capable AI builder. You have mastered the art of Chain Prompting and learned to build Custom GPTs, powerful automations, production-ready AI assistants, and full-stack web applications. The world of AI is at your fingertips. Now, go build the future." }
      ]
    }
  ]
};
