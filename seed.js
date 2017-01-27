const db = require('./models');

const House = require('./models/house');
const Student = require('./models/student');

const Promise = require('sequelize').Promise;

const houses = [
  {
    name: 'Gryffindor',
    mascot: 'Lion',
  },
  {
    name: 'Hufflepuff',
    mascot: 'Badger'
  },
  {
    name: 'Ravenclaw',
    mascot: 'Eagle'
  },
  {
    name: 'Slytherin',
    mascot: 'Serpent' 
  }
];

const gryffindorStudents = [
  {
    name: 'Harry Potter', 
    bio: 'Harry James Potter (b. 31 July, 1980) was a half-blood wizard, the only child and son of the late James and Lily Potter (née Evans), and one of the most famous wizards of modern times. In what proved to be a vain attempt to circumvent a prophecy that stated that a boy born at the end of July of 1980 could be able to defeat him, Lord Voldemort tried to murder him when he was a year and three months old. Voldemort murdered Harry\'s parents as they tried to protect him, shortly before attacking Harry. This early unsuccessful attempt to vanquish Harry led to Voldemort\'s first downfall, marking the end of the First Wizarding War and to Harry henceforth being known as the "Boy Who Lived." One consequence of Lily\'s loving sacrifice was that her orphaned son had to be raised by her only remaining blood relative. Harry was raised by his Muggle aunt Petunia Dursley in a home where he was neither welcomed nor nurtured, but would be protected from Lord Voldemort, at least until he was seventeen years old, only because of a powerful charm Albus Dumbledore made. As the only known survivor, up to that point, of the Killing Curse, Harry was already Wizarding World-famous long before he first arrived at Hogwarts School of Witchcraft and Wizardry in 1991, to begin the first of what were supposed to have been seven years of study.'
  },
  {
    name: 'Hermione Granger',
    bio: 'Hermione Jean Granger (b. 19 September, 1979) was a Muggle-born witch born to Mr and Mrs Granger, both dentists in London. Hermione was raised as a Muggle girl until, at age eleven, she learned that she was a witch and had been accepted into Hogwarts School of Witchcraft and Wizardry. She began attending the school on 1 September, 1991, where she was subsequently sorted into Gryffindor House, despite having the choice to be in Ravenclaw. She possessed a brilliant academic mind, and proved to be a gifted student in almost every subject that she studied. She was very studious and bookish.'
  },
  {
    name: 'Ron Weasley',
    bio: 'Ronald Bilius "Ron" Weasley (b. 1 March, 1980) was a pure-blood wizard, the sixth son of Arthur and Molly Weasley (née Prewett), and the deuteragonist of the Harry Potter series. He was also the younger brother of Bill, Charlie, Percy, Fred, George, and the elder brother of Ginny. Ron and his brothers and sister lived in the Burrow. Ron began attending Hogwarts School of Witchcraft and Wizardry in 1991 and was Sorted into Gryffindor House. He soon became best friends with fellow student Harry Potter and later Hermione Granger.' 
  }
];

const slytherinStudents = [
  {
    name: 'Draco Malfoy',
    bio: 'Draco Lucius Malfoy (b. 5 June, 1980) was a pure-blood wizard and the only son of Lucius and Narcissa Malfoy. The son of a Death Eater, Draco was raised to believe strongly in the importance of blood purity. He attended Hogwarts School of Witchcraft and Wizardry from 1991-1998 and was sorted into Slytherin House. During his years at Hogwarts, he became friends with Vincent Crabbe, Gregory Goyle, Pansy Parkinson, and other fellow Slytherins, but he quickly developed a rivalry with Harry Potter.' 
  }
];

const ravenclawStudents = [
  {
    name: 'Luna Lovegood',
    bio: 'Luna Lovegood (b. 13 February, 1981) was a witch, the only child and daughter of Xenophilius and Pandora Lovegood. Her mother accidentally died while experimenting with spells when Luna was nine and Luna was raised by her father, editor of the magazine The Quibbler, in a rook-like house near the village of Ottery St Catchpole.'
  }
];

const hufflepuffStudents =[
  {
    name: 'Hannah Abbott',
    bio: 'Hannah Longbottom (née Abbott) (b. 1979/1980) was a half-blood witch who was in the same year at Hogwarts School of Witchcraft and Wizardry as Harry Potter. She was sorted into Hufflepuff House in 1991. In her fifth year she became both a prefect and a member of Dumbledore\'s Army, an organisation taught and led by Harry Potter. In 1996 Hannah was pulled out of school after her mother was murdered by Death Eaters, but she returned the following year and was again a member of the D.A. and fought in the Battle of Hogwarts on 2 May, 1998.'
  }
];

db.sync({force: true})
.then(() => Promise.map(houses, House.create.bind(House)))
.spread((gryffindor, hufflepuff, ravenclaw, slytherin) => {
  return Promise.all([
    Promise.map(gryffindorStudents, Student.create.bind(Student)),
    Promise.map(slytherinStudents, Student.create.bind(Student)),
    Promise.map(ravenclawStudents, Student.create.bind(Student)),
    Promise.map(hufflepuffStudents, Student.create.bind(Student))
  ])
  .spread((gryffindors, slytherins, ravenclaws, hufflepuffs) => {
    return Promise.all([
      gryffindor.addMembers(gryffindors),
      ravenclaw.addMembers(ravenclaws),
      hufflepuff.addMembers(hufflepuffs),
      slytherin.addMembers(slytherins)
    ]); 
  });
})
.then(() => console.log('Finished inserting data'))
.catch(err => {
  console.error('Problem on the Hogwarts Express:', err);
})
.finally(() => {
  db.close();
  return null;
});
