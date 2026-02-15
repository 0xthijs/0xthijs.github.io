
import streamlit as st

def generate_agenda(brain_dump, tone):
    """
    Dummy AI function to generate the strategic agenda.
    In a real application, this would call an LLM.
    """
    # Hardcoded response for now
    return f"""
## 🟢 Strategic Wins
*   **Shipped Project X**: Successfully deployed the new internal tool ahead of schedule.
*   **Team Optimization**: Streamlined the onboarding process, reducing ramp-up time by 15%.

## 🔴 Critical Blockers
*   **Access to Data Warehouse**: Pending approval for 2 weeks; need this to proceed with the analytics dashboard. (Impact: Delayed insights for Q2 planning).
*   **Budget Approval**: Need sign-off on the new software license to avoid improved workflow bottlenecks.

## 🔵 Discussion Topic
*   **Career Growth**: structured path to Senior Developer role. I'd like to discuss the specific milestones I need to hit in the next 6 months.
    """

def main():
    st.set_page_config(page_title="The 1:1 Architect", layout="wide")

    st.title("The 1:1 Architect")
    st.markdown("### Prepare for your manager meeting with impact.")

    # Sidebar: Settings
    with st.sidebar:
        st.header("Settings")
        tone = st.radio(
            "Select Tone:",
            ("Direct", "Diplomatic"),
            index=0
        )
        st.info(f"Current Tone: {tone}")

    # Main Area: or Input
    st.subheader("Brain Dump")
    brain_dump = st.text_area(
        "What happened these last two weeks? What is annoying you? What did you ship?",
        height=200,
        placeholder="e.g., Finished the API integration, but blocked by the firewall issues. Also, I want to discuss my promotion timeline..."
    )

    # Action Button
    if st.button("Generate Strategic Agenda", type="primary"):
        if brain_dump:
            with st.spinner("Reframing your thoughts into a strategic agenda..."):
                # Call the dummy AI function
                agenda = generate_agenda(brain_dump, tone)
                
                # Output Area
                st.markdown("---")
                st.markdown(agenda)
        else:
            st.warning("Please enter your brain dump first.")

if __name__ == "__main__":
    main()
