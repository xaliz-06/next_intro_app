import { MongoClient, ObjectId } from "mongodb";

import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";

const MeetupId = ({ meetupData }) => {
  console.log(meetupData);
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        title={meetupData.title}
        image={meetupData.image}
        address={meetupData.address}
        description={meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const uri =
    "mongodb+srv://xaliz06:8Q66NwvPW9hRgjG7@cluster0.cbo4cok.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const database = client.db("meetups");
  const meetupsCollection = database.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const uri =
    "mongodb+srv://xaliz06:8Q66NwvPW9hRgjG7@cluster0.cbo4cok.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();

  const database = client.db("meetups");
  const meetupsCollection = database.collection("meetups");

  const objectId = new ObjectId(meetupId);

  const selectedMeetup = await meetupsCollection.findOne({
    _id: objectId,
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupId;
