# Interactivity Inspired by Hightouch's Content Assembly

This project is a personal interactive experiment inspired by Hightouch's product storytelling and website presentation.

My goal here is to study how a strong product website can communicate confidence and clarity, then translate that feeling into small interactive experiences that make the product story feel more alive for visitors.

This project takes those moments as a starting point and reimagines them as lightweight product interactions. Each component tries to preserve the polish and emotional clarity of the original inspiration while answering a harder question: what would this moment feel like if it were a believable interface someone could actually use?

## What's Here

- `AgentEdit`: reimagines an AI-guided content edit as a direct before-and-after interaction.
- `ReviewPanel`: reimagines a review interruption as a resolvable workflow step.

## Run Locally

- `git clone https://github.com/internetdrew/inspired-by-hightouch.git`
- `cd inspired-by-hightouch`
- `npm install`
- `npm run dev`

## Reimagining The Moments

### Project Framing

- Treat Hightouch as inspiration for product storytelling, not as a target for critique.
- Use the site and video language as a starting point for experimentation in interaction design.
- Focus on bringing product confidence and clarity to life through stateful UI, not just visual imitation.
- Build scenes that work as interactive experiences, not only as motion compositions.

### AgentEdit Reimagining

The `AgentEdit` demo in `src/components/AgentEdit.tsx` started as inspiration from a polished product-storytelling moment. Reimagining it as an interactive experience meant making the edit path more obvious, making the editable target feel intentional, and making the outcome communicate product value immediately.

- Reframe the scene so the agent card acts as the control surface and the email acts as the canvas.
- Make the editable region feel clearly targeted before the change happens.
- Ensure the before-and-after result communicates value at a glance.
- Use hierarchy and restrained motion to make the action path obvious without overexplaining it.
- Tighten the mock content so the experience feels credible, not just visually inspired.

### ReviewPanel Reimagining

The `ReviewPanel` demo in `src/components/ReviewPanel.tsx` began as a passive review interruption in the source video. Reimagining it as an interactive experience meant preserving the clarity of that interruption while turning it into a usable decision point with a believable downstream effect on the review flow.

- Preserve the issue as the clear focal stop in the sequence, not just another visual state.
- Translate the original frame into an actionable moment with an obvious resolution path.
- Make the interruption explain what is wrong, why it matters, and what the user should do next.
- Advance the post-fix sequence in a way that makes the product logic feel believable.
- Let hierarchy and state progression communicate value more clearly than decoration alone.
