/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

const obj = [
    {
        type: "Rent",
        percent: 35,
        color: "rgb(255, 205, 86)"
    },
    {
        type: "Salary",
        percent: 50,
        color: "rgb(255, 99, 132)"
    },
    {
        type: "Investment",
        percent: 15,
        color: "rgb(54, 162, 235)"
    },
]

const Labels = () => {
  return (
    <>
    {obj.map((v,i)=><LabelComponent key={i} data={v}></LabelComponent>)}
    </>
  )
}

function LabelComponent({data}: any){
    if(!data) return <></>;
    return (
        <div className="labels flex justify-between">
            <div className="flex gap-2">
                <div className="w-2 h-2 rounded py-4" style={{background: data.color ?? "#f9c74f"}}></div>
                <h3 className="text-md">{data.type ?? ''}</h3>
            </div>
            <h3 className="font-bold">{data.percent ?? 0}%</h3>
        </div>
    )
}

export default Labels
