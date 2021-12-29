// import { db } from "../firebase";

// const algoliasearch = require("algoliasearch");

// const ALGOLIA_APP_ID = "b12b797870374752bae74754513ad587";
// const ALGOLIA_ADMIN_KEY = "7b178ead86465fb9f5add0d0441f0b1b";

// var client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
// var chatIndex = client.initIndex("Whatsapp clone");

// //Loading initial chats data

// const functions = require("firebase-functions");
// const admin = require("firebase-admin");
// // export default function useAlgolia() {

// exports.addChatsFirestoreDataToAlgolia = functions.https.onRequest(
//   (req, res) => {
//     var chatArray = [];
//     //Get all the documents from the Firestore collection called    //chats
//     admin
//       .firestore()
//       .collection("users")
//       .get()
//       .then((docs) => {
//         //Get all the data from each document
//         docs.forEach((doc) => {
//           let chat = doc.data();
//           //As per the algolia rules, each object needs to have a key                        //called objectID (AS IS)
//           //If you do not set this, algolia will set a random id
//           chat.objectID = doc.id;
//           chatArray.push(chat);
//         });
//         return chatIndex
//           .saveObjects(chatArray)
//           .then(() => {
//             console.log("Documents imported into Algolia");
//             console.log(chatArray);
//             return true;
//           })
//           .catch((error) => {
//             console.error("Error when importing documents into Algolia", error);
//             return true;
//           });
//       })
//       .catch((error) => {
//         console.log("Error getting the chats collection", error);
//       });
//   }
// );
// // }


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Authenticate to Algolia Database.
// TODO: Make sure you configure the `algolia.app_id` and `algolia.api_key` Google Cloud environment variables.
const algoliasearch = require('algoliasearch').default;
const ALGOLIA_APP_ID = "LAF2ZJSORR";
const ALGOLIA_API_KEY = "b12b797870374752bae74754513ad587";

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);;

// Name fo the algolia index for Blog posts content.
const ALGOLIA_POSTS_INDEX_NAME = 'Whatsapp clone';

// Updates the search index when new blog entries are created or updated.
exports.indexentry = functions.database.ref('users').onWrite(
    async (data, context) => {
      const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);
      const firebaseObject = {
        text: data.after.val(),
        objectID: context.params.blogid
      };

      await index.saveObject(firebaseObject);
      return data.after.ref.parent.child('last_index_timestamp').set(Date.parse(context.timestamp));
    });

// Starts a search query whenever a query is requested (by adding one to the `/search/queries`
// element. Search results are then written under `/search/results`.
exports.searchentry = functions.database.ref('/search/queries/{queryid}').onCreate(
    async (snap, context) => {
      const index = client.initIndex(ALGOLIA_POSTS_INDEX_NAME);

      const query = snap.val().query;
      const key = snap.key;

      const content = await index.search(query);
      const updates = {
        '/search/last_query_timestamp': Date.parse(context.timestamp),
      };
      updates[`/search/results/${key}`] = content;
      return admin.database().ref().update(updates);
    });