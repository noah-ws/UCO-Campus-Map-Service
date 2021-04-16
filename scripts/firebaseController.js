//-------------------------------- Configuration for FirebaseFirestore --------------------------------//

const firebaseConfig = {
    apiKey: "AIzaSyDJ4SVerZgGodKbClc3xRSgFNVDpPMslPg",
    authDomain: "uco-cms.firebaseapp.com",
    projectId: "uco-cms",
    storageBucket: "uco-cms.appspot.com",
    messagingSenderId: "318740561508",
    appId: "1:318740561508:web:6c29f6a5a80d4262cf6971",
    measurementId: "G-M1E63ZQ6DM"
};

firebase.initializeApp(firebaseConfig);

let cloudDB = firebase.firestore();

// Add buidling
function addBuildingWithAutoID() { // Auto generate ID for doc
    cloudDB.collection("UCOBuildings").add(
        {
            BuildingName: bName,
            BuildingCode: bCode,
            Latitude: Number(bLat),
            Longitude: Number(bLng),
        }
    ).then(function (docRef) {
        console.log("DocID  ", docRef.id);
    }).catch(function (e) {
        console.error("Error adding", e);
    })
}

function addBuildingWithID() { // Use custom ID for doc
    cloudDB.collection("UCOBuildings").doc(bCode).set(
        {
            BuildingName: bName,
            BuildingCode: bCode,
            Latitude: Number(bLat),
            Longitude: Number(bLng),
        }
    ).then(function () {
        console.log("DocID  ", bCode);
    }).catch(function (e) {
        console.error("Error adding", e);
    })

}
// Retrieve building
function retrieveBuilding() {
    cloudDB.collection("UCOBuildings").doc(bCode).get(
    ).then(function (doc) {
        if (doc.exists) {
            buildingName.value = doc.data().BuildingName;
            b_latitude.value = doc.data().Latitude;
            b_longitude.value = doc.data().Longitude;
            console.log("Retrieved successfully with docID ", bCode);
        } else {
            console.log("Doc does not exist");
        }
    }).catch(function (e) {
        console.log("error", error);
    })
}

// Retrieve all buildings in collection "UCOBuildings"
async function retrieveAllBuildings() {
    const snapshot = await cloudDB.collection('UCOBuildings').get();
    return snapshot.docs.map(doc => doc.data());
}

async function retrieveAllBuildingAutos() {
    const snapshot = await cloudDB.collection('Doors').get();
    return snapshot.docs.map(doc => doc.data());
}

// Update building
function updateFieldsInDoc() {
    cloudDB.collection("UCOBuildings").doc(bCode).update(
        {
            BuildingName: bName,
            // BuildingCode: bCode,
            Latitude: Number(bLat),
            Longitude: Number(bLng),
        }
    ).then(function (docRef) {
        console.log("Overwritten with ID  ", bCode);
    }).catch(function (e) {
        console.error("Error updating", e);
    })
}

// Delete building
function deleteDoc() {
    cloudDB.collection("UCOBuildings").doc(bCode).delete()
        .then(function (docRef) {
            console.log("Deleted doc with ID  ", bCode);
        }).catch(function (e) {
            console.error("Error deleting", e);
        })
}

// Add door
function addDoorWithAutoID() { // Auto generate ID for doc
    cloudDB.collection("Doors").add(
        {
            BuildingCode: dBldCode,
            Latitude: Number(dLat),
            Longitude: Number(dLng),
        }
    ).then(function (docRef) {
        console.log("DocID  ", docRef.id);
    }).catch(function (e) {
        console.error("Error adding", e);
    })
}
