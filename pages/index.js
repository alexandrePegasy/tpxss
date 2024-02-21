import { useState, useEffect } from 'react';
import { useMemo } from "react";

export default function Home() {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    // Fonction pour charger les commentaires depuis le backend
    const loadComments = async () => {
      try {
        const response = await fetch('/api/comments', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('La requête pour récupérer les commentaires a échoué');
        }
        const comments = await response.json();
        setCommentsList(comments);
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires:', error);
      }
    };

    loadComments();
  }, []); // Ce tableau vide signifie que cet effet ne s'exécute qu'au montage du composant

  const submitComment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comment }),
      });

      if (!response.ok) {
        throw new Error('La requête a échoué');
      }

      const updatedComment = await response.json(); 
      setCommentsList([...commentsList, updatedComment]);
      setComment(''); 
    } catch (error) {
      console.error('Erreur lors de l’envoi du commentaire:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Commentaires</h1>
      <form onSubmit={submitComment} className="mb-8">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Laissez un commentaire..."
          className="form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm text-black"
        />
        <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Poster
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Commentaires précédents</h2>
        <div className="space-y-4">
          {commentsList.map((comment, index) => (
            <p key={index} className="bg-gray-100 rounded-md p-4 text-black">{comment.comment}</p> // Assurez-vous que la structure de l'objet comment correspond à ce que votre backend renvoie
          ))}
        </div>
      </div>
    </div>
  );
}
