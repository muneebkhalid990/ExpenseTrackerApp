import React from "react";

interface LabelData {
  name: string;
//   percent: number;
  color: string;
}

interface LabelsProps {
  categories: LabelData[];
}

const Labels: React.FC<LabelsProps> = ({ categories }) => {
  return (
    <>
      {categories.map((category, index) => (
        <LabelComponent key={index} data={category} />
      ))}
    </>
  );
};

interface LabelComponentProps {
  data: LabelData;
}

const LabelComponent: React.FC<LabelComponentProps> = ({ data }) => {
  return (
    <div className="labels flex justify-between">
      <div className="flex gap-2">
        <div
          className="w-2 h-2 rounded py-4"
          style={{ background: data.color }}
        ></div>
        <h3 className="text-md">{data.name}</h3>
      </div>
      {/* <h3 className="font-bold">{data.percent}%</h3> */}
    </div>
  );
};

export default Labels;
