// Importation de la connexion à la bdd
const connexion = require('../config/db.js');
const User = require('./user.js');

// Class Utilisateur
class Admin extends User
{
  // Déclaration des attributs locales
  
  // Constructeur des informations
  /*constructor(dataUser)
  {
    // INITIALISATION DES DONNEES D'INSCRIPTION
    if (dataUser.statutConnexion === 'inscription')
    {
      // Création de l'utilisateur inscrit
      let resultat = this.addUser(dataUser.id, dataUser.email, dataUser.statut, dataUser.droit_reservation, dataUser.niveau_tarif)
      // Initialisation locale des données de l'utilisateur courant
      if (resultat === 'inscrit')
      {
        this.id = dataUser.id
        this.email = dataUser.email
        this.statut = dataUser.statut
        this.droit_reservation = dataUser.droit_reservation
        this.niveau_tarif = dataUser.niveau_tarif
      }
    // INITIALISATION DES DONNEES DE CONNEXION
    }else
    {
      // Initialisation locale des données de l'utilisateur courant
      this.id = dataUser.id
      this.email = dataUser.email
      this.statut = dataUser.statut
      this.droit_reservation = dataUser.droit_reservation
      this.niveau_tarif = dataUser.niveau_tarif
    }
  }*/

  // RECUPERATION DE LA LISTE DES UTILISATEURS
  selectAllUser(retour)
  {
    // Requête de récupération des données des utilisateurs
    connexion.query('SELECT * FROM utilisateur', (erreur, resultat) => {
      // Traitement de l'erreur
      if (erreur) throw erreur
      // Fin de traitement
      retour(resultat)
    })
  }

  // RECUPARATION DE DONNEES UTILISATEUR
  selectDataUser(id, traitement)
  {
    // Requête de récupération des données utilisateurs
    connexion.query('SELECT * FROM utilisateur WHERE id_utilisateur = ?', [id], (erreur, res) => {
      // Traitement de l'erreur
      if (erreur) throw erreur
      // Finalisation de l'inscription
      if (res.length > 0)
      {
        // Traitement des données
        traitement({
          statut: 'disponible',
          user: res
        })
      } else
      {
        // Notification d'absence
        traitement({
          statut: 'indisponible'
        })
      }
    })
  }

  // CREATION D'UN NOUVEL UTILISATEUR
  updateUser(id, email, statut, droit_reservation, niveau_tarif, traitement)
  {
    // Requête de récupération des données utilisateurs
    connexion.query('UPDATE utilisateur SET email = ?, statut = ?, droitReservation = ?, niveauTarif = ? WHERE id_utilisateur = ?', [email, statut, droit_reservation, niveau_tarif, id], (erreur, res) => {
      // Traitement de l'erreur
      if (erreur) throw erreur
      // Notification de création du nouvel utilisateur
      console.log('Mise à jour à l\'id : ' + id)
      // Finalisation de l'inscription
      traitement('update')
    })
  }

  // SUPRESSION D'UN UTILISATEUR
  deleteUser(id, traitement)
  {
    // Requête de supression des données utilisateur
    connexion.query('DELETE FROM utilisateur WHERE id_utilisateur = ?', [id], (erreur, res) => {
      // Traitement de l'erreur
      if (erreur) throw erreur
      // Finalisation de la supression
      traitement({
        statut: 'supression',
        user: id
      })
    })
  }

  // SUPRESSION D'UN ADHERENT/DEMANDEUR
  deleteAdherent(id, traitement)
  {
    // Requête de supression des données utilisateur
    connexion.query('DELETE FROM demandeur WHERE id_utilisateur = ?', [id], (erreur, res1) => {
      // Traitement de l'erreur
      if (erreur) throw erreur
      // Requête de supression des données utilisateur
      connexion.query('DELETE FROM utilisateur WHERE id_utilisateur = ?', [id], (erreur, res2) => {
        // Traitement de l'erreur
        if (erreur) throw erreur
        // Finalisation de la supression
        traitement({
          statut: 'supression',
          user: id
        })
      })
    })
  }
}

// Exportation de la class
module.exports = Admin