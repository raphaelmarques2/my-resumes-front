import { useEffect } from "react";
import type { Education } from "../../services/types/Education";
import { sharedEducations } from "../../stores/sharedEducations";

export function SetSharedEducations({
  educations,
}: {
  educations: Education[];
}) {
  useEffect(() => {
    sharedEducations.store.set(educations);
  }, []);
  return null;
}
