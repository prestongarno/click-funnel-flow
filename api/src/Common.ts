export {Success,Failure,Result,FailureLevel};

enum FailureLevel {
  SOFT, CRITICAL
}

const Success = true;
type Failure = {
  reason: string,
  severity: FailureLevel
}
type Result = typeof Success | Failure