import { useState } from 'react';

export default function Home() {
  const [comment, setComment] = useState('');
  const [commentsList, setCommentsList] = useState([]);

  const submitComment = (e) => {
    e.preventDefault();
    // Ajoute directement le commentaire à la liste sans sanitisation
    setCommentsList([...commentsList, comment]);
    setComment(''); // Réinitialise le champ de commentaire
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
            // Pour éviter l'exécution de code JavaScript malveillant, il est recommandé de ne pas utiliser dangerouslySetInnerHTML
            // et plutôt de s'assurer que le contenu est correctement échappé ou nettoyé avant l'affichage.
            <p key={index} className="bg-gray-100 rounded-md p-4 text-black">{comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
}