import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firestore = firebase.firestore();

const Account = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const usersRef = firestore.collection('Users');
  const query = usersRef.orderBy('email');
  const [users] = useCollectionData(query, { idField: 'id' });

  const updateUser = async (id) => {
    await usersRef.doc(id).update({ email, password });
  };

  const deleteUser = async (id) => {
    await usersRef.doc(id).delete();
  };

  return (
    <div>
      <h1>Bem-vindo à página Sobre!</h1>
      {users && users.map(user => (
        <div key={user.id}>
          <h2>{user.email}</h2>
          <p>Password: {user.password}</p> {/* Display the user's password */}
          <button onClick={() => updateUser(user.id)}>Update</button>
          <button onClick={() => deleteUser(user.id)}>Delete</button>
        </div>
      ))}
      <form onSubmit={updateUser}>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="New Email" />
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="New Password" />
        <button type="submit">Update Account</button>
      </form>
    </div>
  );
}

export default Account;
