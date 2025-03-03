document.addEventListener("DOMContentLoaded", function () {
  // Fonction de mise à jour de la prévisualisation des informations personnelles
  function updatepersonalpreview() {
    document.getElementById("previewFullName").textContent =
      document.getElementById("fullName").value;
    document.getElementById("prevStatus").textContent =
      document.getElementById("status").value;
    document.getElementById("prevEmail").textContent =
      document.getElementById("email").value;
    document.getElementById("prevPhone").textContent =
      document.getElementById("phone").value;
    document.getElementById("prevJobTitle").textContent =
      document.getElementById("jobTitle").value;
    document.getElementById("prevAddress").textContent =
      document.getElementById("address").value;
    document.getElementById("prevDescription").textContent =
      document.getElementById("description").value;
  }

  // Ajout d'écouteurs sur les champs de base
  [
    "fullName",
    "status",
    "email",
    "phone",
    "jobTitle",
    "address",
    "description",
  ].forEach(function (id) {
    document
      .getElementById(id)
      .addEventListener("input", updatepersonalpreview);
  });

  // Appel initial pour pré-remplir les champs de prévisualisation
  updatepersonalpreview();
});

// Prévisualisation de la photo de profil
document
  .getElementById("profilePic")
  .addEventListener("change", function (event) {
    const file = event.target.files[0]; //  Récupération du fichier£
    if (file) {
      const reader = new FileReader(); //  Un objet FileReader est créé pour lire le contenu du fichier sélectionné.
      reader.onload = function (e) {
        const img = document.getElementById("previewProfilePic");
        img.src = e.target.result;
        img.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });
// previsualisation du champ experiences
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("addExperience")
    .addEventListener("click", function () {
      const container = document.createElement("div");
      // Ajoute des classes Tailwind pour le style et cache temporairement l'élément pour l'animation
      container.className =
        "experience-item mb-4 border rounded p-4 opacity-0 translate-y-5 transition-all duration-300 ease-out";

      // Insère les champs de saisie pour l'expérience (entreprise, poste, durée, description)
      container.innerHTML = `
      <div class="mb-2">
        <input type="text" class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Nom de l'entreprise" required>
      </div>
      <div class="mb-2">
        <input type="text" class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Poste occupé" required>
      </div>
      <div class="mb-2">
        <input type="text" class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Durée (ex: 2020 - 2023)" required>
      </div>
      <div class="mb-2">
        <textarea class="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500" placeholder="Description des missions" rows="2" required></textarea>
      </div>
      <!-- Bouton pour ajouter l'expérience au CV -->
      <button class="addToCV bg-green-500 text-white px-4 py-2 rounded-md transition-transform transform hover:scale-105">Ajouter au CV</button>
      <!-- Bouton pour supprimer l'expérience -->
      <button class="removeExperience bg-red-500 text-white px-4 py-2 rounded-md ml-2 transition-transform transform hover:scale-105">Supprimer</button>
    `;

      // Ajoute le nouvel élément dans la section expérience du document
      document.getElementById("experienceSection").appendChild(container);

      // Animation d'apparition : supprime la classe qui cache l'élément après un court délai
      setTimeout(() => {
        container.classList.remove("opacity-0", "translate-y-5");
      }, 10);

      // Ajoute un événement au bouton "Ajouter au CV"
      container
        .querySelector(".addToCV")
        .addEventListener("click", function () {
          addExperienceToPreview(container); // Ajoute l'expérience dans l'aperçu du CV
          resetFields(container); // Efface les champs après l'ajout
        });

      // Ajoute un événement au bouton "Supprimer" pour supprimer l'expérience avec animation
      container
        .querySelector(".removeExperience")
        .addEventListener("click", function () {
          // Ajoute les classes d'animation pour disparition (fade-out + slide-out)
          container.classList.add("opacity-0", "translate-y-5");
          // Supprime l'élément après 300ms (le temps de l'animation)
          setTimeout(() => {
            container.remove();
            updateExperiencesPreview(); // Met à jour l'aperçu après suppression
          }, 300);
        });
    });

  // Fonction pour ajouter une expérience à l'aperçu du CV
  function addExperienceToPreview(expItem) {
    const previewList = document.getElementById("previewExperiences"); // Sélectionne la liste d'aperçu
    const inputs = expItem.querySelectorAll("input, textarea"); // Récupère tous les champs de saisie

    // Récupère les valeurs des champs
    const company = inputs[0].value;
    const position = inputs[1].value;
    const duration = inputs[2].value;
    const description = inputs[3].value;

    // Vérifie si tous les champs sont remplis avant d'ajouter à l'aperçu
    if (company && position && duration && description) {
      const li = document.createElement("li"); // Crée un élément <li> pour l'expérience
      li.className =
        "opacity-0 translate-y-5 transition-all duration-300 ease-out"; // Cache temporairement pour animation
      li.innerHTML = `<strong>${company}</strong> - ${position} (${duration})<br><small>${description}</small>`;
      previewList.appendChild(li); // Ajoute l'expérience à l'aperçu

      // Animation d'apparition de l'expérience ajoutée
      setTimeout(() => {
        li.classList.remove("opacity-0", "translate-y-5");
      }, 10);
    }
  }

  // Fonction pour réinitialiser les champs après ajout
  function resetFields(container) {
    container
      .querySelectorAll("input, textarea")
      .forEach((input) => (input.value = "")); // Vide tous les champs du formulaire
  }

  // Fonction pour mettre à jour l'aperçu des expériences
  function updateExperiencesPreview() {
    const previewList = document.getElementById("previewExperiences"); // Sélectionne l'aperçu des expériences
    previewList.innerHTML = ""; // Efface le contenu actuel pour éviter les doublons
    document
      .querySelectorAll("#experienceSection .experience-item")
      .forEach(addExperienceToPreview); // Recrée la liste
  }
});

// Formation
document.getElementById("addFormation").addEventListener("click", function () {
  const container = document.createElement("div");
  container.className =
    "formation-item mb-4 border border-gray-300 p-4 rounded-md shadow-sm";
  container.innerHTML = `
      <div class="mb-2">
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Diplôme obtenu" required>
      </div>
      <div class="mb-2">
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Établissement" required>
      </div>
      <div class="mb-2">
        <input type="text" class="w-full p-2 border border-gray-300 rounded-md" placeholder="Année d'obtention" required>
      </div>
    `;
  document.getElementById("formationSection").appendChild(container);
  updateFormationPreview();
  container.addEventListener("input", updateFormationPreview);
});
function updateFormationPreview() {
  const previewList = document.getElementById("previewFormation");
  previewList.innerHTML = "";
  document
    .querySelectorAll("#formationSection .formation-item")
    .forEach(function (formItem) {
      const inputs = formItem.querySelectorAll("input");
      const Diplome = inputs[0].value;
      const Etablissement = inputs[1].value;
      const Annee = inputs[2].value;
      if (Diplome || Etablissement || Annee) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${Diplome}</strong> - ${Etablissement} (${Annee})`;
        previewList.appendChild(li);
      }
    });
}
//competences
document.getElementById("addCompetence").addEventListener("click", function () {
  const container = document.createElement("div");
  container.className =
    "competence-item mb-3 flex items-center gap-2 border border-gray-300 p-3 rounded-md shadow-sm";

  container.innerHTML = `
      <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" placeholder="Compétence" required>
      <select class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" required>
        <option value="">Niveau</option>
        <option value="Débutant">Débutant</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Avancé">Avancé</option>
        <option value="Expert">Expert</option>
      </select>
    `;

  document.getElementById("competenceSection").appendChild(container);
  updateCompetencePreview();
  container.addEventListener("input", updateCompetencePreview);
});

function updateCompetencePreview() {
  const previewList = document.getElementById("previewCompetence");
  previewList.innerHTML = "";

  document
    .querySelectorAll("#competenceSection .competence-item")
    .forEach(function (compeItem) {
      const skillInput = compeItem.querySelector("input").value;
      const levelSelect = compeItem.querySelector("select").value;

      if (skillInput || levelSelect) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${skillInput}</strong> - ${levelSelect}`;
        previewList.appendChild(li);
      }
    });
}

// Centres d'intérêt
document.getElementById("addInterest").addEventListener("click", function () {
  const input = document.getElementById("interestInput");
  const interest = input.value.trim();
  if (interest !== "") {
    const li = document.createElement("li");
    li.className = "list-none p-2 border-b border-gray-200"; // Classe Tailwind
    li.textContent = interest;
    document.getElementById("interestList").appendChild(li);
    input.value = "";
    updateInterestsPreview();
  }
});

function updateInterestsPreview() {
  const previewList = document.getElementById("previewInterests");
  previewList.innerHTML = "";
  document.querySelectorAll("#interestList li").forEach(function (item) {
    const li = document.createElement("li");
    li.textContent = item.textContent;
    previewList.appendChild(li);
  });
}

// Références
document.getElementById("addReference").addEventListener("click", function () {
  const container = document.createElement("div");
  container.className = "reference-item mb-3 border p-4 rounded-lg"; // Classes Tailwind
  container.innerHTML = `
      <div class="mb-2">
        <input type="text" class="form-input border border-gray-300 rounded-md p-2 w-full" placeholder="Nom de la référence" required>
      </div>
      <div class="mb-2">
        <input type="text" class="form-input border border-gray-300 rounded-md p-2 w-full" placeholder="Poste" required>
      </div>
      <div class="mb-2">
        <input type="text" class="form-input border border-gray-300 rounded-md p-2 w-full" placeholder="Contact" required>
      </div>
    `;
  document.getElementById("referenceSection").appendChild(container);
  updateReferencesPreview();
  container.addEventListener("input", updateReferencesPreview);
});

function updateReferencesPreview() {
  const previewList = document.getElementById("previewReferences");
  previewList.innerHTML = "";
  document
    .querySelectorAll("#referenceSection .reference-item")
    .forEach(function (refItem) {
      const inputs = refItem.querySelectorAll("input");
      const refName = inputs[0].value;
      const refPosition = inputs[1].value;
      const refContact = inputs[2].value;
      if (refName || refPosition || refContact) {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${refName}</strong> - ${refPosition} (Contact: ${refContact})`;
        previewList.appendChild(li);
      }
    });
}

// Langues
document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour ajouter un champ de langue
  document.getElementById("addLanguage").addEventListener("click", function () {
    const container = document.createElement("div");
    container.className =
      "language-item mb-3 border border-gray-300 p-4 flex flex-col rounded-lg";

    container.innerHTML = `
      <input type="text" class="border border-gray-300 rounded-md p-2 mb-2" placeholder="Langue" required>
      <select class="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mb-2" required>
        <option value="">Niveau</option>
        <option value="Basique">Basique</option>
        <option value="Intermédiaire">Intermédiaire</option>
        <option value="Courant">Courant</option>
        <option value="Bilingue">Bilingue</option>
      </select>
      <button class="addToPreview bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Ajouter</button>
    `;

    document.getElementById("languageSection").appendChild(container);

    // Ajoute un événement au bouton "Ajouter" pour mettre à jour l'aperçu et vider les champs
    container
      .querySelector(".addToPreview")
      .addEventListener("click", function () {
        addToPreview(container);
      });
  });

  // Fonction pour ajouter une langue à l'aperçu et vider les champs
  function addToPreview(langItem) {
    const previewList = document.getElementById("previewLanguages");
    const langInput = langItem.querySelector("input");
    const levelSelect = langItem.querySelector("select");

    if (langInput.value && levelSelect.value) {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${langInput.value}</strong> - ${levelSelect.value}`;
      previewList.appendChild(li);

      // Vider les champs après ajout
      langInput.value = "";
      levelSelect.value = "";
    }
  }
});

// Sauvegarde dans le Local Storage
function saveToLocalStorage() {
  const cvData = {
    personal: {
      fullName: document.getElementById("fullName").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      jobTitle: document.getElementById("jobTitle").value,
      status: document.getElementById("status").value,
      description: document.getElementById("description").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      profilePic: document.getElementById("previewProfilePic").src,
    },
    experiences: Array.from(
      document.querySelectorAll("#experienceSection .experience-item")
    ).map(function (expItem) {
      const inputs = expItem.querySelectorAll("input, textarea");
      return {
        company: inputs[0].value,
        position: inputs[1].value,
        duration: inputs[2].value,
        description: inputs[3].value,
      };
    }),
    formation: Array.from(
      document.querySelectorAll("#formationSection .formation-item")
    ).map(function (formItem) {
      const inputs = formItem.querySelectorAll("input");
      return {
        Diplome: inputs[0].value,
        Etablissement: inputs[1].value,
        Annee: inputs[2].value,
      };
    }),
    competence: Array.from(
      document.querySelectorAll("#competenceSection .competence-item")
    ).map(function (compeItem) {
      return {
        skill: compeItem.querySelector("input").value,
        level: compeItem.querySelector("select").value,
      };
    }),
    interests: Array.from(document.querySelectorAll("#interestList li")).map(
      function (item) {
        return item.textContent;
      }
    ),
    references: Array.from(
      document.querySelectorAll("#referenceSection .reference-item")
    ).map(function (refItem) {
      const inputs = refItem.querySelectorAll("input");
      return {
        name: inputs[0].value,
        position: inputs[1].value,
        contact: inputs[2].value,
      };
    }),
    languages: Array.from(
      document.querySelectorAll("#languageSection .language-item")
    ).map(function (langItem) {
      return {
        language: langItem.querySelector("input").value,
        level: langItem.querySelector("select").value,
      };
    }),
  };
  localStorage.setItem("cvData", JSON.stringify(cvData));
}

// Chargement depuis le Local Storage (pour les informations personnelles)
function loadFromLocalStorage() {
  const data = localStorage.getItem("cvData");
  if (data) {
    const cvData = JSON.parse(data);
    // Informations personnelles
    document.getElementById("fullName").value = cvData.personal.fullName || "";
    document.getElementById("age").value = cvData.personal.age || "";
    document.getElementById("gender").value = cvData.personal.gender || "";
    document.getElementById("jobTitle").value = cvData.personal.jobTitle || "";
    document.getElementById("situation").value =
      cvData.personal.situation || "";
    document.getElementById("description").value =
      cvData.personal.description || "";
    document.getElementById("email").value = cvData.personal.email || "";
    document.getElementById("phone").value = cvData.personal.phone || "";
    document.getElementById("address").value = cvData.personal.address || "";
    if (cvData.personal.profilePic) {
      const img = document.getElementById("previewProfilePic");
      img.src = cvData.personal.profilePic;
      img.style.display = "block";
    }
    updatePersonalPreview();
  }
}

// Sauvegarde automatique à chaque modification
document
  .getElementById("cv-form")
  .addEventListener("input", saveToLocalStorage);

// Validation lors de la soumission du formulaire
document.getElementById("cv-form").addEventListener("submit", function (e) {
  e.preventDefault();
  // Vérifications de base
  if (document.getElementById("fullName").value.trim() === "") {
    alert("Veuillez renseigner le nom complet.");
    return;
  }
  const age = parseInt(document.getElementById("age").value, 10);
  if (isNaN(age) || age < 18 || age > 65) {
    alert("L'âge doit être compris entre 18 et 65 ans.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(document.getElementById("email").value)) {
    alert("Veuillez entrer un email valide.");
    return;
  }
  const phoneRegex = /^\+?[0-9\s-]{7,15}$/;
  if (!phoneRegex.test(document.getElementById("phone").value)) {
    alert("Veuillez entrer un numéro de téléphone valide.");
    return;
  }

  alert("CV sauvegardé !");
  saveToLocalStorage();
});

// Réinitialisation du formulaire et du Local Storage
document.getElementById("reset").addEventListener("click", function () {
  if (confirm("Voulez-vous vraiment réinitialiser le CV ?")) {
    localStorage.removeItem("cvData");
    location.reload();
  }
});
