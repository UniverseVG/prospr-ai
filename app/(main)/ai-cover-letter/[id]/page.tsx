import React from "react";

const CoverLetter = async ({ params }: { params: { id: string } }) => {
  const id = await params.id;
  return <div>CoverLetter : {id}</div>;
};

export default CoverLetter;
