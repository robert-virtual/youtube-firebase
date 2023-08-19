import { initializeApp } from "firebase/app";
import googleLogo from "./assets/google.png";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  setDoc,
  doc,
} from "firebase/firestore";
import { INote, Note } from "./components/Note";
import { noteConverter } from "./constans";
import { useState } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAMtm9mPcnR_nFK7duCfkcUud2sSHgP0mk",
  authDomain: "tutorial-b1d63.firebaseapp.com",
  projectId: "tutorial-b1d63",
  storageBucket: "tutorial-b1d63.appspot.com",
  messagingSenderId: "1009314540013",
  appId: "1:1009314540013:web:f9bfc3b13cae4f6cb1dfe4",
  measurementId: "G-9NWF5GTTZN",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

const notesRef = collection(db, "notes").withConverter(noteConverter);
const q = query(notesRef, orderBy("createdAt"));
function App() {
  const [user] = useAuthState(auth);
  const [note, setNote] = useState<INote>({} as INote);
  const saveNote = async () => {
    await setDoc(doc(notesRef), {
      ...note,
      createdAt: new Date(),
      updatedAt: new Date(),
      uid: user?.uid,
    });
    setNote({} as INote);
  };
  const [notes] = useCollectionData(q);
  async function singInWithGoogle() {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    console.log(credentials);
  }
  if (!auth.currentUser) {
    return (
      <div className="p-4 grid place-items-center h-screen ">
        <button
          className="bg-blue-500 text-white p-[2px]  flex items-center justify-center"
          onClick={singInWithGoogle}
        >
          <div className="bg-white p-1">
            <img src={googleLogo} width={25} alt="" />
          </div>
          <span className="block mx-2">Sign In With Google</span>
        </button>
      </div>
    );
  }
  return (
    <div className="p-4">
      <button onClick={() => auth.signOut()}>Sign Out</button>
      <div className="flex flex-col bg-slate-800 p-2 rounded gap-2">
        <div className="flex gap-2 justify-between">
          <input
            type="text"
            onChange={({ target }) => setNote({ ...note, title: target.value })}
            className="w-full rounded bg-slate-700 text-white p-2"
            placeholder="Title"
          />

          <button
            onClick={saveNote}
            className="w-10 h-10 text-white bg-slate-700 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </div>
        <textarea
          className="bg-slate-700 text-white p-2"
          cols={30}
          rows={10}
          onChange={({ target }) => setNote({ ...note, content: target.value })}
          placeholder="Content..."
        ></textarea>
      </div>
      {notes && notes.map((note) => <Note key={note.id} note={note} />)}
    </div>
  );
}

export default App;
