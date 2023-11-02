// import { useEffect, useState } from "react";

import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/f8/Schloss_Neuschwanstein_2013.jpg",
//     address: "Hohenschwangau, Germany",
//     description: "A Secret, Private, VIP meetup at Neuschwanstein Castle",
//   },
//   {
//     id: "m2",
//     title: "A Second Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/f8/Schloss_Neuschwanstein_2013.jpg",
//     address: "Hohenschwangau, Germany",
//     description: "A Secret, Private, VIP meetup at Neuschwanstein Castle",
//   },
//   {
//     id: "m3",
//     title: "A Third Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/f8/Schloss_Neuschwanstein_2013.jpg",
//     address: "Hohenschwangau, Germany",
//     description: "A Secret, Private, VIP meetup at Neuschwanstein Castle",
//   },
//   {
//     id: "m4",
//     title: "A Fourth Meetup",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/f/f8/Schloss_Neuschwanstein_2013.jpg",
//     address: "Hohenschwangau, Germany",
//     description: "A Secret, Private, VIP meetup at Neuschwanstein Castle",
//   },
// ];

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Explore premium, VIP meetups and build your network"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const uri =
    "mongodb+srv://xaliz06:8Q66NwvPW9hRgjG7@cluster0.cbo4cok.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const database = client.db("meetups");
  const meetupsCollection = database.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
