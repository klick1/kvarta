from fastapi import APIRouter

from ..schemas import ChallengeOut
from ..security import issue_challenge

router = APIRouter(tags=["challenge"])


@router.get("/api/challenge", response_model=ChallengeOut)
def challenge() -> ChallengeOut:
    return ChallengeOut(**issue_challenge())