import * as React from "react";
import { dock  } from "@nlpjs/core";
import { LangEn } from "@nlpjs/lang-en";
import { Nlp } from "@nlpjs/nlp";
// import { NlpManager } from "node-nlp";

let nlp;
let tempoTreino;

async function boot() {
  if (!nlp) {
    // let manager = new NlpManager({
    //   ner: { ducklingUrl: "https://ducklinghost/parse" }
    // });
    // manager.addLanguage(["en"]);
    await dock.start();

    const container = dock.getContainer(); // await containerBootstrap();
    container.use(Nlp);
    container.use(LangEn);
    nlp = container.get("nlp");
    nlp.settings.autoSave = false;
    nlp.addLanguage("en");
    // Adds the utterances and intents for the NLP
    nlp.addDocument('en', 'goodbye for now', 'greetings.bye');
    nlp.addDocument('en', 'bye bye take care', 'greetings.bye');
    nlp.addDocument('en', 'okay see you later', 'greetings.bye');
    nlp.addDocument('en', 'bye for now', 'greetings.bye');
    nlp.addDocument('en', 'i must go', 'greetings.bye');
    nlp.addDocument('en', 'hello', 'greetings.hello');
    nlp.addDocument('en', 'hi', 'greetings.hello');
    nlp.addDocument('en', 'howdy', 'greetings.hello');
    nlp.addDocument('en', 'Dokter nya!', 'greetings.dokter');
    nlp.addDocument('en', 'Ibuku', 'greetings.ibu');
    
    // Train also the NLG
    nlp.addAnswer('en', 'greetings.bye', 'Till next time');
    nlp.addAnswer('en', 'greetings.bye', 'see you soon!');
    nlp.addAnswer('en', 'greetings.hello', 'Hey there!');
    nlp.addAnswer('en', 'greetings.hello', 'Greetings!');

    nlp.addAnswer('en', 'greetings.dokter', 'Disini!');
    nlp.addAnswer('en', 'greetings.ibu', 'Gendut!');
    
    await nlp.train();
    tempoTreino = await nlp.process('en', 'I should go now');
  }
  return nlp;
}

export function useNLP() {
  const [message, setMessage] = React.useState("");
  const [respon, setRespon] = React.useState({
    answer: "aguarde-treinando"
  });

  React.useEffect(() => {
    boot().then((r) => {
      return nlp.process("en", message).then((res) => {
        setRespon({ ...res, tempoTreino });
      });
    });
  }, [message]);

  return {
    message, setMessage, respon
  };
}
