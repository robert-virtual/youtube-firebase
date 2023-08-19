import { DocumentData, FirestoreDataConverter } from "firebase/firestore";
import { INote } from "./components/Note";

export const noteConverter: FirestoreDataConverter<INote, DocumentData> = {
  toFirestore(note) {
    return note;
  },
  fromFirestore(snapshot, options) {
    const data = snapshot.data(options);
    console.log(data.createdAt);
    console.log(data.createdAt.nanoseconds);
    return {
      id: snapshot.id,
      content: data.content,
      title: data.content,
      createdAt: new Date(data.createdAt.seconds * 1000),
      updatedAt: new Date(data.updatedAt.seconds * 1000),
      uid: data.uid,
    };
  },
};
