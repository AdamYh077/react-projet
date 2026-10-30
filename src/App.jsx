import { useState } from 'react';
import './App.css';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
function App() {
  const [article, setArticle] = useState('');
  const [date, setDateDebut] = useState('');
  const [Date, setDateFin] = useState('');
  const [ressource, setRessource] = useState('');
  const [statut, setStatut] = useState('');
  const [courses, setCourses] = useState([]);

  const donneesStatut = [
  {
    name: "Accomplie",
    value: courses.filter(item =>
      item.statut?.toLowerCase().trim() === "accomplie"
    ).length
  },
  {
    name: "En cours",
    value: courses.filter(item =>
      item.statut?.toLowerCase().trim() === "en cours"
    ).length
  },
  {
    name: "Non accomplie",
    value: courses.filter(item =>
      item.statut?.toLowerCase().trim() === "non accomplie"
    ).length
  }
];

const couleurs = ["#22c55e", "#f59e0b", "#ef4444"];


  function ajouterArticle() {
    if (article.trim() === '') {
      alert("fill input ")
      return;
    }
    const newTask = {
      article:article,
      done:false ,
      date: date,
      DateFin: Date,
      ressource: ressource,
      statut:statut
    };
    setCourses([...courses,newTask ]);
    
    setArticle('');
    setDateDebut('');
    setDateFin('');
    setRessource('');
    setStatut('');
  }
  function supprimerArticle(index) {
    setCourses(courses.filter((_, i) => i !== index));
  }
  return (
    <div className="container">
      <h1>Ma Liste de Courses</h1>
      <div className="formulaire">
        <label for="name">Nom de l'article: </label>
        <input
          type="text"
          placeholder="Entrez un article..."
          value={article}
          onChange={(e) => setArticle(e.target.value)}
        /><br></br>
        <label for="text">Ressource : </label>
        <input type="text"
        placeholder="Ressource"
        value={ressource}
        onChange={(e) => setRessource(e.target.value)}
        /><br></br>
        <label for="name">Date Début: </label>
        <input type="date"
        placeholder="entrez la date"
        value={date}
         onChange={(e) => setDateDebut(e.target.value)}
        /><br></br>
        <label for="name">Date Fin: </label>
        <input type="date"
        placeholder="entrez la date"
        value={Date}
         onChange={(e) => setDateFin(e.target.value)}
        /><br></br>
        <label>Statut :</label>
            <select
  value={statut}
  onChange={(e) => setStatut(e.target.value)}
>
  <option value=""> Choisir un statut </option>
  <option value="Accomplie">Accomplie</option>
  <option value="En cours">En cours</option>
  <option value="Non accomplie">Non accomplie</option>
</select><br></br><br></br>
        <button onClick={ajouterArticle}>
          Ajouter
        </button>
      </div>
      


      <h2>Mes articles</h2>
      {courses.length === 0 ? (
        <p>Aucun article pour le moment.</p>
      ) : (
  <div className="tab-container">
    <table className="tableau">
    <thead>
      <tr>
        <th>Nom de l'article</th>
        <th>Ressource</th>
        <th>Date Début</th>
        <th>Date Fin</th>
        <th>Statut</th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {courses.map((item, index) => (
        <tr key={index}>
          <td>{item.article}</td>
          <td>{item.ressource}</td>
          <td>{item.date}</td>
          <td>{item.DateFin}</td>
          <td>{item.statut}</td>
          <td>
            <button
              className="supprimer"
              onClick={() => supprimerArticle(index)}
            >
              Supprimer
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      <div>
  <h2>Statistiques des articles</h2>

  <ResponsiveContainer width="100%" height={300}>
  <PieChart>
    <Pie
      data={donneesStatut}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="45%"
      outerRadius={100}
      fill="#8884d8"
      label
    >
      {donneesStatut.map((item, index) => (
        <Cell
          key={item.name}
          fill={["#3dca71", "#e69812", "#e64e4e"][index]}
        />
      ))}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>
</div>
  </div>
  
)}
      
    </div>
  );
  
}
export default App;