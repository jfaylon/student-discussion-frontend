import { Word } from "@/interfaces";
import { useEffect, useRef } from "react";
import WordCloud from "wordcloud";



const WordCloudCanvas: React.FC<{ words: Word[] }> = ({ words }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !words.length) return;

    const list = words.map(({ text, value }) => [text, value]) as [
      string,
      number
    ][];

    WordCloud(canvasRef.current, {
      list,
      gridSize: 8,
      weightFactor: 10,
      fontFamily: "sans-serif",
      color: "random-dark",
      backgroundColor: "#ffffff",
      rotateRatio: 0.5,
      rotationSteps: 2,
      shuffle: true,
      drawOutOfBound: false,
    });
  }, [words]);

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Word Cloud from Entries</h2>
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={600} height={400} />
      </div>
    </div>
  );
};

export default WordCloudCanvas;
