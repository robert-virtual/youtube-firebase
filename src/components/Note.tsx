import { FC } from "react";
export interface INote {
  id?: string;
  title: string;
  uid: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
interface Props {
  note: INote;
}
export const Note: FC<Props> = ({ note }) => {
  return (
    <div className="rounded shadow w-40 p-2">
      <h3>{note.title}</h3>
      <span>{note.createdAt.toLocaleDateString()}</span>
    </div>
  );
};
