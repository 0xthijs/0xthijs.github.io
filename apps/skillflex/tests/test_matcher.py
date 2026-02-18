import pytest
from matcher import find_matches

class TestMatcher:
    def test_find_matches_basics(self, db_session, sample_data):
        """
        Verify that matches are found based on skill overlap.
        """
        # Employee 1 (Python, SQL) should match Gig 1 (Python, Django)
        matches = find_matches(sample_data["emp1_id"], db_session=db_session)
        
        assert len(matches) > 0
        assert matches[0]['title'] == "Python Dev"
        assert "Python" in matches[0]['common_skills']
        
    def test_flight_risk_boost(self, db_session, sample_data):
        """
        Verify that flight risk employees get a score boost.
        """
        # Detailed calculation check
        # Emp1: Python, SQL. Gig1: Python, Django.
        # Overlap: 1 (Python). Union: 3? No, Jaccard is Intersection / Required.
        # Required: 2 (Python, Django). Common: 1. Base Score: 50%.
        # Boost: +15%. Total should be 65%.
        
        matches = find_matches(sample_data["emp1_id"], db_session=db_session)
        score = matches[0]['score']
        
        # 50 + 15 = 65
        assert score == 65.0
        
    def test_no_matches(self, db_session, sample_data):
        """
        Verify zero matches logic.
        """
        # Employee 2 (Java) checking Gig 1 (Python) -> Should be 0 match?
        # Except if we iterate all gigs.
        
        matches = find_matches(sample_data["emp2_id"], db_session=db_session)
        
        # Emp 2 matches Gig 2 (Java) but likely not Gig 1 (Python)
        # Let's check Gig 1 score in the list
        
        gig1_match = next((m for m in matches if m['title'] == "Python Dev"), None)
        
        # Should be None match if we filter > 0, or just not present
        assert gig1_match is None
