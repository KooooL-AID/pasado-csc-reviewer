/**
 * Pasado — Content Database
 * Source: csc-eng-grammar.pdf (43 pages, image-based)
 * All answers verified against highlighted correct choices in the PDF.
 * Questions marked status:"validated" were clearly readable from the source.
 * Never fabricate answers or explanations — all explanations authored from grammar rules.
 */

/* ── MODULES ─────────────────────────────────────────────────── */
export const MODULES = [
  {
    id: "eng-grammar",
    title: "English Grammar & Correct Usage",
    subject: "verbal",
    type: "grammar",
    description: "Practice correct English grammar and usage — verb forms, pronouns, subject-verb agreement, and more.",
    icon: "book",
    source: { document: "csc-eng-grammar.pdf", pages: "1–3" }
  },
  {
    id: "eng-vocab-synonyms",
    title: "English Vocabulary — Synonyms",
    subject: "verbal",
    type: "synonym",
    description: "Identify synonyms for underlined words used in context. A core CSE-PPT Verbal Ability question type.",
    icon: "search",
    source: { document: "csc-eng-grammar.pdf", pages: "4–6" }
  },
  {
    id: "word-analogies",
    title: "Word Analogies",
    subject: "analytical",
    type: "analogy",
    description: "Complete the analogy by identifying the relationship between paired words.",
    icon: "link",
    source: { document: "csc-eng-grammar.pdf", pages: "9–12" }
  }
];

/* ── GRAMMAR QUESTIONS (20 items) ───────────────────────────── */
export const GRAMMAR_QUESTIONS = [
  {
    id: "g001",
    moduleId: "eng-grammar",
    type: "multiple_choice",
    topic: "word_usage",
    question: 'Which sentence uses "famish" correctly?',
    choices: [
      "After the straight exam, I felt too exhausted and famished to eat my favourite foods.",
      "I could eat a horse, I am famish now.",
      "I famished my stomach next time you treat me to a meal out.",
      "I will bring lots of pizza, that's a famish."
    ],
    answer: 0,
    explanation: '"Famished" is the correct past-participle form used as an adjective, meaning extremely hungry. The other options incorrectly use "famish" as a present adjective (B), past-tense verb without proper context (C), or noun (D) — none of which are standard English.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g002",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "modal_verbs",
    question: "Priscila _______ rather not invest her savings in the stock market.",
    choices: ["must", "has to", "could", "would"],
    answer: 3,
    explanation: '"Would rather" is the correct idiomatic phrase for expressing preference. "Priscila would rather not..." expresses that she prefers not to do something. "Must" and "has to" express obligation; "could" expresses ability or possibility — none fit the sense of preference.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g003",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "gerunds",
    question: "Did you have any problem _______ our house?",
    choices: ["search", "to search", "searching", "for searching"],
    answer: 2,
    explanation: 'After the noun "problem," English uses a gerund (verb + -ing): "problem searching." This is a standard pattern — compare "difficulty doing," "trouble finding." The infinitive (to search) or prepositional phrase (for searching) do not fit this construction.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g004",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "gerunds_possessives",
    question: "I hope you don't mind _____ joining you.",
    choices: ["to be", "I had been", "that I may", "my"],
    answer: 3,
    explanation: 'After "mind," the gerund form is required. When specifying who performs the action, the possessive pronoun precedes the gerund: "mind my joining you." This is called the possessive-gerund construction. The other options are non-standard in this context.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g005",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "irregular_plurals",
    question: "Most basketball players are 6 _____ tall or more.",
    choices: ["foot", "feet", "foots", "feets"],
    answer: 1,
    explanation: '"Feet" is the correct irregular plural of "foot." When a measurement is used with numbers greater than one, the plural form applies. "Foots" is not a valid word in this sense; "feets" is never correct. Note: "foot" is used in compound adjectives (a 6-foot player) but not here.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g006",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "subject_verb_agreement",
    question: "These children _____ how to improvise more props for the play.",
    choices: ["knew", "knows", "know", "known"],
    answer: 2,
    explanation: '"These children" is a plural subject. In the simple present tense, plural subjects take the base verb form without -s: "they know," not "they knows." "Knew" is simple past; "known" is a past participle — neither works here without auxiliary support.',
    status: "validated",
    sourcePage: 1
  },
  {
    id: "g007",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "pronouns",
    question: "The company will upgrade _____ computer systems next week.",
    choices: ["there", "their", "its", "it's"],
    answer: 2,
    explanation: '"Its" is the correct possessive pronoun for a singular entity like "the company." "Their" is the plural possessive; "there" is an adverb of place; "it\'s" is a contraction for "it is." Only "its" shows possession by a singular non-person.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g008",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "perfect_tenses",
    question: "Clara _____ three thousand words for her essay.",
    choices: ["have wrote", "has wrote", "have written", "has written"],
    answer: 3,
    explanation: '"Has written" is the correct present perfect: singular subject "Clara" takes "has" (not "have"), and "written" is the standard past participle of "write" ("wrote" is the simple past, not the past participle). "Have wrote" and "has wrote" are both non-standard.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g009",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "irregular_plurals",
    question: "You have too many _____ but few time to prove you're right.",
    choices: ["hypothesis", "hypotheses", "hyphothesises", "hypothesess"],
    answer: 1,
    explanation: '"Hypotheses" is the correct plural of "hypothesis." Words ending in -sis form their plurals by changing -sis to -ses: analysis → analyses, crisis → crises, thesis → theses. "Hyphothesises" and "hypothesess" are misspellings.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g010",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "verb_tenses",
    question: "Neither Sarah nor Tina _____ the crime yesterday.",
    choices: ["witness", "witnesses", "witnessed", "witnessing"],
    answer: 2,
    explanation: '"Yesterday" signals that simple past tense is required. "Witnessed" is the simple past of "witness." With "neither...nor," the verb agrees with the nearest subject (Tina, singular) for present tense, but past tense uses one form for all subjects.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g011",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "question_tags",
    question: "You do like going to the party alone. _____ you?",
    choices: ["Does", "Doesn't", "Do", "Don't"],
    answer: 3,
    explanation: 'Tag questions reverse the polarity (positive → negative) and repeat the auxiliary verb from the main clause. The main clause is positive and uses "do" with the subject "you," so the tag becomes negative: "don\'t you?" "Does/Doesn\'t" would be used with a third-person singular subject.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g012",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "causative_verbs",
    question: "We had our house _____ in yellow.",
    choices: ["painting", "painted", "paint", "to paint"],
    answer: 1,
    explanation: 'The causative "have" follows the pattern: have + object + past participle. "We had our house painted" means we arranged for someone else to paint it. This is distinct from "have + object + base verb" (which means to instruct someone directly), which would be "We had them paint the house."',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g013",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "progressive_aspect",
    question: "He has been exercising but his immune system was steadily _________.",
    choices: ["weak", "weaken", "weakened", "weakening"],
    answer: 3,
    explanation: '"Was steadily weakening" is the past progressive, correctly describing an ongoing gradual process in the past. "Weak" is an adjective (not a verb complement); "weaken" is the base form; "weakened" implies a completed action — none carry the progressive sense of "steadily" here.',
    status: "validated",
    sourcePage: 2
  },
  {
    id: "g014",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "adjective_formation",
    question: "I was _____ that the weather would be sunny and we would be able to enjoy our swimming.",
    choices: ["hopeless", "hopeful", "hopelike", "hopely"],
    answer: 1,
    explanation: '"Hopeful" means feeling or inspiring hope — the correct adjective here. "Hopeless" is the antonym (without hope). "Hopelike" and "hopely" are not real English words. The suffix "-ful" creates adjectives meaning "full of or characterized by."',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g015",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "word_formation_prefixes",
    question: "I think it's not a great idea. I totally _____.",
    choices: ["misagree", "unagree", "inagree", "disagree"],
    answer: 3,
    explanation: '"Disagree" is the only valid word here. The prefix "dis-" is used with "agree" to form its antonym. "Mis-" means wrongly or badly (misuse, misspell); "un-" and "in-" are not used with "agree" in standard English.',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g016",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "uncountable_nouns",
    question: "So many ____________ I found in the library, now I'm ready to report.",
    choices: ["information", "informations", "infoes", "infos"],
    answer: 0,
    explanation: '"Information" is an uncountable (mass) noun in English and has no plural form. We say "much information" or "a lot of information," never "informations." Though "many" is used here colloquially, the noun form stays singular. "Infoes" and "infos" are informal slang not used in formal contexts.',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g017",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "irregular_plurals",
    question: "My grandpa always feed his flock of _______ early in the morning.",
    choices: ["sheeps", "sheep", "ships", "ship"],
    answer: 1,
    explanation: '"Sheep" is a zero-plural noun — its singular and plural forms are identical: "one sheep," "fifty sheep," never "sheeps." "Ships" and "ship" refer to vessels, not the animal. Other zero-plural animals include deer, fish, and moose.',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g018",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "parallel_structure",
    question: "Happy memories are always remembered, not ________.",
    choices: ["forget", "forgets", "forgot", "forgotten"],
    answer: 3,
    explanation: '"Forgotten" is the past participle of "forget," maintaining parallel structure with "remembered" (also a past participle). Both are used in passive voice constructions here. "Forget" is the base form; "forgets" is third-person singular present; "forgot" is simple past — none are past participles.',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g019",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "verb_choice",
    question: 'Flight Z735 _____ yesterday. 350 passengers died in that accident.',
    choices: ["crush", "crushed", "crash", "crashed"],
    answer: 3,
    explanation: '"Crashed" is the correct simple past tense of "crash" — to collide violently, fail catastrophically, or fall from the sky. "Yesterday" confirms past tense. "Crushed" means compressed or squeezed, which doesn\'t apply to an aircraft accident in this context.',
    status: "validated",
    sourcePage: 3
  },
  {
    id: "g020",
    moduleId: "eng-grammar",
    type: "sentence_completion",
    topic: "adjective_participles",
    question: "There is a ________ message when you look closely at her painting.",
    choices: ["hid", "hide", "hided", "hidden"],
    answer: 3,
    explanation: '"Hidden" is the past participle of "hide," here used as an adjective to modify "message." "Hid" is the simple past tense; "hide" is the base verb; "hided" is an alternative past form meaning to tan leather — not the past participle of "hide" in the sense of concealing.',
    status: "validated",
    sourcePage: 3
  }
];

/* ── VOCABULARY SYNONYM QUESTIONS (13 items) ─────────────────── */
export const VOCAB_QUESTIONS = [
  {
    id: "v001",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "If you are <u>ambivalent</u> with the answers, analyze the given problem.",
    targetWord: "ambivalent",
    choices: ["confusion", "innocent", "uncertain", "unaware"],
    answer: 2,
    explanation: '"Ambivalent" describes having mixed or contradictory feelings — being uncertain or undecided. "Uncertain" is the best synonym. "Confused" is related but implies a lack of understanding rather than mixed feelings; "innocent" and "unaware" are unrelated.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v002",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "He left the country because of the <u>ominous</u> experiences he had in the past.",
    targetWord: "ominous",
    choices: ["unforgettable", "threatening", "ugly", "remarkable"],
    answer: 1,
    explanation: '"Ominous" means giving the impression that something bad is about to happen — foreboding and threatening. "Threatening" captures this sense best. "Unforgettable" and "remarkable" are positive/neutral; "ugly" is about appearance, not menace.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v003",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Teenagers are easily <u>susceptible</u> to peer influence.",
    targetWord: "susceptible",
    choices: ["flexible", "inspired", "dependable", "inclined"],
    answer: 3,
    explanation: '"Susceptible" means likely to be influenced or harmed; having a tendency toward something. "Inclined" (having a tendency) is the closest available synonym. "Flexible" means adaptable; "inspired" and "dependable" are unrelated to being easily influenced.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v004",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "My mother is always <u>adamant</u> in eating breakfast before leaving the house.",
    targetWord: "adamant",
    choices: ["resolute", "uncertain", "forgetful", "clueless"],
    answer: 0,
    explanation: '"Adamant" means refusing to change one\'s mind; unshakeably determined. "Resolute" (firmly determined) is the direct synonym. "Uncertain" is the opposite; "forgetful" and "clueless" are entirely unrelated.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v005",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Reading words without understanding their meaning is <u>futile</u>.",
    targetWord: "futile",
    choices: ["helpless", "useless", "unnecessary", "avoidable"],
    answer: 1,
    explanation: '"Futile" means producing no useful result; incapable of success; pointless. "Useless" is the most direct synonym — both emphasize the absence of any productive outcome. "Helpless" describes a person\'s state; "unnecessary" and "avoidable" are related but softer ideas.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v006",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "She wears gold but people know how <u>ostentatious</u> she can be.",
    targetWord: "ostentatious",
    choices: ["pretentious", "ambitious", "gorgeous", "rebellious"],
    answer: 0,
    explanation: '"Ostentatious" describes a conspicuous, often excessive display of wealth or status to impress others. "Pretentious" (claiming or displaying more than one deserves) is the best match. "Ambitious" is about goals; "gorgeous" is a compliment; "rebellious" is about defiance.',
    status: "validated",
    sourcePage: 4
  },
  {
    id: "v007",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "He submitted a <u>grotesque</u> artwork that nobody in the class could relate to.",
    targetWord: "grotesque",
    choices: ["different", "weird", "beautiful", "colorful"],
    answer: 1,
    explanation: '"Grotesque" describes something comically or repulsively ugly, distorted, or bizarre. "Weird" (strange and unsettling) is the closest available synonym in this limited set. "Different" is too neutral; "beautiful" and "colorful" are unrelated or contradictory.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v008",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Their <u>clandestine</u> affair remained unknown for three years.",
    targetWord: "clandestine",
    choices: ["forbidden", "surprise", "secret", "unacceptable"],
    answer: 2,
    explanation: '"Clandestine" means kept secret or done secretly, especially because it is illicit. "Secret" is the direct synonym. "Forbidden" means not allowed; "surprise" and "unacceptable" do not carry the same meaning.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v009",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "They say love is like a firework, a <u>fleeting</u> moment.",
    targetWord: "fleeting",
    choices: ["brief", "unforgettable", "shinny", "remarkable"],
    answer: 0,
    explanation: '"Fleeting" describes something that lasts for a very short time — transient and passing quickly. "Brief" is the most accurate synonym. "Unforgettable" and "remarkable" are the opposite idea; "shinny" is not a standard English word.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v010",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Cara is repulsive and rebellious. She always speaks <u>sordid</u> words.",
    targetWord: "sordid",
    choices: ["dirty", "vulgar", "weird", "bizarre"],
    answer: 1,
    explanation: '"Sordid" describes things that are morally degrading, dishonorable, or base. "Vulgar" (crude and offensive) is the best match in context. "Dirty" is related but physical; "weird" and "bizarre" emphasize strangeness rather than moral degradation.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v011",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Every time I see Cathy looking at me, I feel <u>Euphoria</u> in my bones.",
    targetWord: "euphoria",
    choices: ["gravity", "ecstasy", "erotic", "numb"],
    answer: 1,
    explanation: '"Euphoria" is an intense feeling of happiness, excitement, and well-being. "Ecstasy" (an overwhelming feeling of joy) is its closest synonym. "Gravity" is seriousness or the physical force; "erotic" relates to desire; "numb" is the opposite sensation.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v012",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "I bought this book because when I read the <u>blurb</u> at the back, I fell in love with it.",
    targetWord: "blurb",
    choices: ["summary", "teaser", "blog", "plot"],
    answer: 1,
    explanation: 'A "blurb" is a short promotional description printed on a book\'s cover, intended to attract readers. "Teaser" (a brief promotional excerpt generating interest) is the closest match. A "summary" gives the full story; "blog" is a web format; "plot" refers to narrative events.',
    status: "validated",
    sourcePage: 5
  },
  {
    id: "v013",
    moduleId: "eng-vocab-synonyms",
    type: "synonym",
    question: "Finding a way out of the <u>labyrinth</u> is the last challenge of the competition.",
    targetWord: "labyrinth",
    choices: ["castle", "forest", "maze", "box"],
    answer: 2,
    explanation: 'A "labyrinth" is a complicated network of winding passages — a maze. "Maze" is the direct synonym. A "castle" is a fortress; a "forest" is a wooded area; a "box" is a container — none of these involve complex pathways.',
    status: "validated",
    sourcePage: 5
  }
];

/* ── WORD ANALOGY QUESTIONS (10 items) ──────────────────────── */
export const ANALOGY_QUESTIONS = [
  {
    id: "a001",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Census : population :: inventory : _____",
    choices: ["accounting", "merchandise", "cost", "list"],
    answer: 1,
    explanation: 'A census is an official count or record of a population. An inventory is an official count or record of merchandise. The relationship is: systematic count/record → what is being counted.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a002",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Oath : promise :: contract : _____",
    choices: ["license", "contact", "agreement", "paper"],
    answer: 2,
    explanation: 'An oath is a formal, binding type of promise. A contract is a formal, binding type of agreement. The relationship is: formal/legal form → its general category.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a003",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Glimmer : flicker :: murmur : _____",
    choices: ["whisper", "shout", "rumor", "speak"],
    answer: 0,
    explanation: 'A glimmer and a flicker are both synonyms for a faint, unsteady light. A murmur and a whisper are both synonyms for a soft, quiet sound. The relationship is: near-synonyms of faint/quiet versions of a sensory phenomenon.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a004",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Bouquet : flowers :: flock : _____",
    choices: ["dogs", "sheep", "ship", "cats"],
    answer: 1,
    explanation: 'A bouquet is the collective noun for a group of flowers. A flock is the collective noun for a group of sheep (or birds). The relationship is: collective noun → the specific type of group it names.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a005",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Rescind : law :: withdraw : _____",
    choices: ["bank", "candidacy", "deposit", "resume"],
    answer: 1,
    explanation: 'To rescind a law means to officially cancel or revoke it. To withdraw a candidacy means to officially cancel or take back one\'s nomination. The relationship is: formal verb meaning to officially cancel → what is being formally cancelled.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a006",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Hoax : deceive :: filibuster : _____",
    choices: ["delay", "refuse", "stop", "none"],
    answer: 0,
    explanation: 'A hoax is an act done to deceive. A filibuster is a political tactic used to delay (obstruct progress by prolonged speech or other means). The relationship is: tactic or action → its purpose or intended effect.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a007",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Syllabus : course :: agenda : _____",
    choices: ["subject", "platform", "meeting", "lesson"],
    answer: 2,
    explanation: 'A syllabus is a structured outline or plan for a course. An agenda is a structured outline or plan for a meeting. The relationship is: a formal plan or outline → the event or activity it organizes.',
    status: "validated",
    sourcePage: 10
  },
  {
    id: "a008",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Molecule : atoms :: tissue : _____",
    choices: ["organ", "cells", "body", "neutrons"],
    answer: 1,
    explanation: 'A molecule is composed of atoms (its smallest building blocks). Tissue is composed of cells (its smallest structural units). The relationship is: a larger biological or chemical unit → the smaller components it is built from.',
    status: "validated",
    sourcePage: 11
  },
  {
    id: "a009",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Call : telephone :: type : _____",
    choices: ["cellphone", "ipad", "keyboard", "piano"],
    answer: 2,
    explanation: 'You call (make phone calls) using a telephone. You type (enter text) using a keyboard. The relationship is: an action → the specific tool or device used to perform that action.',
    status: "validated",
    sourcePage: 11
  },
  {
    id: "a010",
    moduleId: "word-analogies",
    type: "analogy",
    question: "Eavesdrop : conversation :: trespass : _____",
    choices: ["property", "house", "land", "assets"],
    answer: 0,
    explanation: 'To eavesdrop is to intrude upon a conversation without permission. To trespass is to intrude upon property without permission. The relationship is: unauthorized intrusion → what is being intruded upon. "Property" is the broadest and most precise term.',
    status: "validated",
    sourcePage: 11
  }
];

/* ── VOCABULARY FLASHCARDS (20 cards) ──────────────────────── */
export const VOCABULARY_FLASHCARDS = [
  {
    id: "fw001", word: "ambivalent", partOfSpeech: "adjective",
    definition: "Having mixed or contradictory feelings about something or someone; uncertain or undecided.",
    synonyms: ["uncertain", "undecided", "conflicted", "equivocal"],
    antonyms: ["certain", "resolute", "decisive"],
    exampleSentence: "She felt ambivalent about the promotion — it meant more money but far less time with her family.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw002", word: "ominous", partOfSpeech: "adjective",
    definition: "Giving the impression that something bad or unpleasant is about to happen; foreboding.",
    synonyms: ["threatening", "foreboding", "sinister", "menacing"],
    antonyms: ["promising", "auspicious", "encouraging"],
    exampleSentence: "The dark, ominous clouds gathering on the horizon warned us that the storm was near.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw003", word: "susceptible", partOfSpeech: "adjective",
    definition: "Likely to be influenced or harmed by a particular thing; having little resistance.",
    synonyms: ["vulnerable", "inclined", "prone", "sensitive"],
    antonyms: ["resistant", "immune", "impervious"],
    exampleSentence: "Young children are especially susceptible to catching colds during the rainy season.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw004", word: "adamant", partOfSpeech: "adjective",
    definition: "Refusing to change one's mind; inflexibly determined; unshakeable in one's position.",
    synonyms: ["resolute", "firm", "unyielding", "steadfast", "inflexible"],
    antonyms: ["flexible", "yielding", "compliant", "uncertain"],
    exampleSentence: "The manager was adamant that the report had to be submitted before noon, with no exceptions.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw005", word: "futile", partOfSpeech: "adjective",
    definition: "Producing no useful result; incapable of success; pointless or ineffective.",
    synonyms: ["useless", "pointless", "fruitless", "ineffective", "vain"],
    antonyms: ["effective", "productive", "worthwhile", "fruitful"],
    exampleSentence: "It was futile to argue with him once he had already made up his mind.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw006", word: "ostentatious", partOfSpeech: "adjective",
    definition: "Characterized by a conspicuous and excessive display of wealth or status; showy.",
    synonyms: ["pretentious", "showy", "flamboyant", "flashy", "extravagant"],
    antonyms: ["modest", "humble", "understated", "simple"],
    exampleSentence: "The ostentatious mansion, filled with golden fixtures, made every visitor uncomfortable.",
    source: { document: "csc-eng-grammar.pdf", page: 4 }
  },
  {
    id: "fw007", word: "grotesque", partOfSpeech: "adjective",
    definition: "Comically or repulsively ugly or distorted; bizarre and strange in an unsettling way.",
    synonyms: ["bizarre", "distorted", "monstrous", "outlandish", "freakish"],
    antonyms: ["beautiful", "conventional", "normal", "refined"],
    exampleSentence: "The funhouse mirror produced a grotesque reflection that made everyone's face look twisted.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw008", word: "clandestine", partOfSpeech: "adjective",
    definition: "Kept secret or done secretly, especially because it is illicit or unauthorized.",
    synonyms: ["covert", "secret", "hidden", "underground", "surreptitious"],
    antonyms: ["open", "public", "overt", "transparent"],
    exampleSentence: "The spies held clandestine meetings in cafés, careful never to be seen together in public.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw009", word: "fleeting", partOfSpeech: "adjective",
    definition: "Lasting for a very short time; passing quickly; transient.",
    synonyms: ["brief", "momentary", "transient", "short-lived", "passing"],
    antonyms: ["lasting", "permanent", "enduring", "prolonged"],
    exampleSentence: "She caught only a fleeting glimpse of the rare bird before it vanished into the trees.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw010", word: "sordid", partOfSpeech: "adjective",
    definition: "Involving dishonorable, immoral, or base actions; dirty and squalid.",
    synonyms: ["vulgar", "base", "vile", "corrupt", "disreputable"],
    antonyms: ["honorable", "decent", "noble", "respectable"],
    exampleSentence: "The tabloids published the sordid details of the politician's secret life.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw011", word: "euphoria", partOfSpeech: "noun",
    definition: "A feeling of intense happiness, excitement, and well-being; an exhilarated state of joy.",
    synonyms: ["ecstasy", "elation", "joy", "bliss", "exhilaration"],
    antonyms: ["misery", "despair", "depression", "sadness"],
    exampleSentence: "The team was swept up in euphoria after winning the championship in the final seconds.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw012", word: "blurb", partOfSpeech: "noun",
    definition: "A short promotional description of a book or other work, typically printed on its cover.",
    synonyms: ["teaser", "synopsis", "pitch", "description"],
    antonyms: [],
    exampleSentence: "The blurb on the back cover promised a gripping mystery, and the book did not disappoint.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw013", word: "labyrinth", partOfSpeech: "noun",
    definition: "A complicated network of winding passages or paths; a maze; anything extremely complex and confusing.",
    synonyms: ["maze", "network", "tangle", "web"],
    antonyms: [],
    exampleSentence: "The ancient palace was a labyrinth of corridors, and even the guards occasionally got lost.",
    source: { document: "csc-eng-grammar.pdf", page: 5 }
  },
  {
    id: "fw014", word: "filibuster", partOfSpeech: "noun / verb",
    definition: "A political tactic of obstruction through prolonged speech; to use such a tactic to delay a vote.",
    synonyms: ["obstruction", "delay", "stall", "obstruct"],
    antonyms: ["expedite", "facilitate", "advance"],
    exampleSentence: "The opposition senator staged a filibuster that lasted fourteen hours to prevent the vote.",
    source: { document: "csc-eng-grammar.pdf", page: 10 }
  },
  {
    id: "fw015", word: "rescind", partOfSpeech: "verb",
    definition: "To revoke, cancel, or repeal a law, order, or agreement formally and officially.",
    synonyms: ["revoke", "cancel", "repeal", "annul", "withdraw"],
    antonyms: ["enact", "enforce", "uphold", "ratify"],
    exampleSentence: "The court ordered the company to rescind the unfair contract clauses immediately.",
    source: { document: "csc-eng-grammar.pdf", page: 10 }
  },
  {
    id: "fw016", word: "eavesdrop", partOfSpeech: "verb",
    definition: "To secretly listen to a conversation that one is not meant to hear.",
    synonyms: ["spy", "listen in", "snoop", "overhear"],
    antonyms: [],
    exampleSentence: "She accidentally eavesdropped on her colleagues' conversation while waiting outside the door.",
    source: { document: "csc-eng-grammar.pdf", page: 11 }
  },
  {
    id: "fw017", word: "trespass", partOfSpeech: "verb / noun",
    definition: "To enter someone's land or property without permission; an unlawful act of such entry.",
    synonyms: ["intrude", "encroach", "invade", "violate"],
    antonyms: [],
    exampleSentence: "The sign warned that anyone who trespassed on the construction site would be prosecuted.",
    source: { document: "csc-eng-grammar.pdf", page: 11 }
  },
  {
    id: "fw018", word: "hoax", partOfSpeech: "noun / verb",
    definition: "A humorous or malicious deception; a trick played on someone to make them believe something false.",
    synonyms: ["deception", "trick", "ruse", "fraud", "swindle"],
    antonyms: ["truth", "fact", "reality"],
    exampleSentence: "The viral news story turned out to be a hoax, and the website later issued a retraction.",
    source: { document: "csc-eng-grammar.pdf", page: 10 }
  },
  {
    id: "fw019", word: "syllabus", partOfSpeech: "noun",
    definition: "An outline or summary of the topics covered in a course of study; a curriculum guide.",
    synonyms: ["curriculum", "outline", "course plan", "schedule"],
    antonyms: [],
    exampleSentence: "The professor distributed the syllabus on the first day, listing all readings and deadlines.",
    source: { document: "csc-eng-grammar.pdf", page: 10 }
  },
  {
    id: "fw020", word: "census", partOfSpeech: "noun",
    definition: "An official count or survey of a population, typically recording various details about each individual.",
    synonyms: ["count", "tally", "enumeration", "survey"],
    antonyms: [],
    exampleSentence: "The government conducts a census every ten years to record changes in population and demographics.",
    source: { document: "csc-eng-grammar.pdf", page: 10 }
  }
];

/* ── COMBINED EXPORTS ──────────────────────────────────────── */
export const ALL_QUESTIONS = [
  ...GRAMMAR_QUESTIONS,
  ...VOCAB_QUESTIONS,
  ...ANALOGY_QUESTIONS
];

export const QUESTIONS_BY_MODULE = {
  "eng-grammar": GRAMMAR_QUESTIONS,
  "eng-vocab-synonyms": VOCAB_QUESTIONS,
  "word-analogies": ANALOGY_QUESTIONS
};

export const QUESTION_COUNTS = {
  "eng-grammar": GRAMMAR_QUESTIONS.length,
  "eng-vocab-synonyms": VOCAB_QUESTIONS.length,
  "word-analogies": ANALOGY_QUESTIONS.length,
  "flashcards": VOCABULARY_FLASHCARDS.length
};
