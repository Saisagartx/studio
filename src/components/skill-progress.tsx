"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface SkillProgressProps {
  value: number;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ value }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();
    const duration = 1000; // 1 second animation

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progressValue = Math.min((elapsedTime / duration) * value, value);
      
      setProgress(progressValue);

      if (elapsedTime < duration) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [value]);

  return <Progress value={progress} className="h-2" />;
};

export default SkillProgress;
