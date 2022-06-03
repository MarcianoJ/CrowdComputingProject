import logo from './logo.svg';
import './App.css';
import GameNav from './components/GameNav'
import {  unstable_HistoryRouter as HistoryRouter ,
  Routes,
  Route } from "react-router-dom";
import HighlightTask from './components/HighlightTask'
import LabelTask from './components/LabelTask'
import React, { useState } from 'react';
import { createBrowserHistory } from "history";
import { ReactSession }  from 'react-client-session';

const history = createBrowserHistory({ window });

var item = window.localStorage.getItem('index');

if(!item)
  window.localStorage.setItem('index', 0);



function App() {
//DATA STRUCTURE
//  {
//    "sentence": {
//      "label":0/1,
//      "rational":[...]
//    }
//  }
  const [data, setData] = useState({})
  const [index, setIndex] = useState(0)

  var sentences = ["Had he known what was going to happen, he would have never stepped into the shower.","    He always wore his sunglasses at night.","    There was coal in his stocking and he was thrilled.","    I was offended by the suggestion that my baby brother was a jewel thief.","    There are no heroes in a punk rock band.","    He had a wall full of masks so she could wear a different face every day.","    The minute she landed she understood the reason this was a fly-over state.","    While on the first date he accidentally hit his head on the beam.","    He excelled at firing people nicely.","    For oil spots on the floor, nothing beats parking a motorbike in the lounge.","    Green should have smelled more tranquil, but somehow it just tasted rotten.","    Abstraction is often one floor above you.","    The fact that there's a stairway to heaven and a highway to hell explains life well.","    It was at that moment that he learned there are certain parts of the body that you should never Nair.","    Sometimes, all you need to do is completely make an ass of yourself and laugh it off to realise that life isn\u2019t so bad after all.","    He was sure the Devil created red sparkly glitter.","    He loved eating his bananas in hot dog buns.","    The clouds formed beautiful animals in the sky that eventually created a tornado to wreak havoc.","    The worst thing about being at the top of the career ladder is that there's a long way to fall.","    Seek success, but always be prepared for random cats.","    The tattered work gloves speak of the many hours of hard labor he endured throughout his life.","    Mom didn\u2019t understand why no one else wanted a hot tub full of jello.","    He had reached the point where he was paranoid about being paranoid.","    I became paranoid that the school of jellyfish was spying on me.","    He set out for a short walk, but now all he could see were mangroves and water were for miles.","    There's a reason that roses have thorns.","    The wooden spoon couldn\u2019t cut but left emotional scars.","    Everyone pretends to like wheat until you mention barley.","    David subscribes to the \"stuff your tent into the bag\" strategy over nicely folding it.","    Sixty-Four comes asking for bread.","    The fish dreamed of escaping the fishbowl and into the toilet where he saw his friend go.","    She works two jobs to make ends meet; at least, that was her reason for not having time to join us.","    Mr. Montoya knows the way to the bakery even though he's never been there.","    One small action would change her life, but whether it would be for better or for worse was yet to be determined.","    The newly planted trees were held up by wooden frames in hopes they could survive the next storm.","    The team members were hard to tell apart since they all wore their hair in a ponytail.","    They throw cabbage that turns your brain into emotional baggage.","    His son quipped that power bars were nothing more than adult candy bars.","    He decided water-skiing on a frozen lake wasn\u2019t a good idea.","    I\u2019m a living furnace.","    Every manager should be able to recite at least ten nursery rhymes backward.","    The teenage boy was accused of breaking his arm simply to get out of the test.","    Jason lived his life by the motto, \"Anything worth doing is worth doing poorly.","    He found the chocolate covered roaches quite tasty.","    Having no hair made him look even hairier.","    The thick foliage and intertwined vines made the hike nearly impossible.","    Smoky the Bear secretly started the fires.","    My uncle's favorite pastime was building cars out of noodles.","    This made him feel like an old-style rootbeer float smells.","    He knew it was going to be a bad day when he saw mountain lions roaming the streets.","","","    Siri became confused when we reused to follow her directions.","    I liked their first two albums but changed my mind after that charity gig.","    His ultimate dream fantasy consisted of being content and sleeping eight hours in a row.","    Jason didn\u2019t understand why his parents wouldn\u2019t let him sell his little sister at the garage sale.","    The manager of the fruit stand always sat and only sold vegetables.","    At that moment he wasn't listening to music, he was living an experience.","    As he looked out the window, he saw a clown walk by.","    Not all people who wander are lost.","    As you consider all the possible ways to improve yourself and the world, you notice John Travolta seems fairly unhappy.","    The anaconda was the greatest criminal mastermind in this part of the neighborhood.","    I cheated while playing the darts tournament by using a longbow.","    The father handed each child a roadmap at the beginning of the 2-day road trip and explained it was so they could find their way home.","    The hummingbird's wings blurred while it eagerly sipped the sugar water from the feeder.","    Yeah, I think it's a good environment for learning English.","    I am happy to take your donation; any amount will be greatly appreciated.","    Potato wedges probably are not best for relationships.","    The fish listened intently to what the frogs had to say.","    He walked into the basement with the horror movie from the night before playing in his head.","    It doesn't sound like that will ever be on my travel list.","    She was only made the society president because she can whistle with her toes.","    I'd rather be a bird than a fish.","    She was too busy always talking about what she wanted to do to actually do any of it.","    Most shark attacks occur about 10 feet from the beach since that's where the people are.","    Pair your designer cowboy hat with scuba gear for a memorable occasion.","    He found rain fascinating yet unpleasant.","    The newly planted trees were held up by wooden frames in hopes they could survive the next storm.","    I had a friend in high school named Rick Shaw, but he was fairly useless as a mode of transport.","    Cats are good pets, for they are clean and are not noisy.","    He said he was not there yesterday; however, many people saw him there.","    I am counting my calories, yet I really want dessert.","    He was sitting in a trash can with high street class.","    I can't believe this is the eighth time I'm smashing open my piggy bank on the same day!","    Barking dogs and screaming toddlers have the unique ability to turn friendly neighbors into cranky enemies.","    Karen believed all traffic laws should be obeyed by all except herself.","    Eating eggs on Thursday for choir practice was recommended.","    He invested some skill points in Charisma and Strength.","    It's not possible to convince a monkey to give you a banana by promising it infinite bananas when they die.","    We have young kids who often walk into our room at night for various reasons including clowns in the closet.","    As the asteroid hurtled toward earth, Becky was upset her dentist appointment had been canceled.","    A good example of a useful vegetable is medicinal rhubarb.","    She wrote him a long letter, but he didn't read it.","    It didn't take long for Gary to detect the robbers were amateurs.","    I've never seen a more beautiful brandy glass filled with wine.","    Nothing is as cautiously cuddly as a pet porcupine.","    The tree fell unexpectedly short.","    It had been sixteen days since the zombies first attacked.","    It's a skateboarding penguin with a sunhat!","    She finally understood that grief was her love with no place for it to go.","    When he encountered maize for the first time, he thought it incredibly corny.","    You have every right to be angry, but that doesn't give you the right to be mean."]


  return (
    <HistoryRouter  history={history}>
          <Routes>
            <Route path="/" element={<HighlightTask sentences = {sentences} data={data} setData={setData} index={index} setIndex={setIndex} history={history}  />}/>
            <Route path="/label" element={<LabelTask sentences = {sentences} data={data} setData={setData} index={index} setIndex={setIndex} history={history} />}/>
            <Route path="/finished" element={<h3>FINISHED</h3>}/>
          </Routes>
          <h3>sentence n. {index}</h3>

    </HistoryRouter >
  );
}

export default App;


