import { useState, type FormEvent, type ChangeEvent } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebaseConfig'; 

interface User {
  id?: string;
  name: string;
}
const AddDataForm = () => {

  const [data, setData] = useState<Omit<User, 'id'>>({ name: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {

      await addDoc(collection(db, 'users'), data);
      alert('Data added!');
      setData({ name: '' });

    } catch (error: any) {
      console.error('Error adding document: ', error);
      alert(`Error adding data: ${error.message}`); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add User Data (Name Only)</h2>
      <input
        name="name"
        value={data.name}
        onChange={handleChange}
        placeholder="Name"
        type="text"
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddDataForm;