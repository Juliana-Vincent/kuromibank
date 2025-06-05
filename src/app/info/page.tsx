import './style.css';
import Accordion from '../../../components/Accordion';
import PageWrapper from '../../../components/AnimationPresence';

const faq = [
  { title: 'Can I send money to my friends in Charmmy Town?', content: 'Yes you can! 💌 Use KeroppiPay to send coins to your friends with a hop and a smile. Simply click "Send Sparkle", type in their name, and confirm with a heart tap. 🐸💚' },
  { title: 'How do I check my balance?', content: 'Just tap the sparkly "Balance Bubbles" button at the top right! 🎈 Hello Kitty will show your current balance on a cute ribbon card — no magic wand needed. ✨💳' },
  { title: 'Can I get a Hello Kitty-themed debit card?', content: 'Whether it’s for a Tamagotchi or just a rainy day, head to “My Treasures > Open Jar” and choose a savings goal. Kuromi will guard it with mischief and love! 🏦💜' },
];

export default function Info(){
  
  return (
    <>
    <PageWrapper>
      <div className="header header-info">
        <div className="container">
          <div className="header-content">
            <h1>Feel free to ask!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
      
      <div className="content">
        <div className="container">
          <div className="w-full flex justify-center pt-28 pb-5"><h1>faq</h1></div>
          <div className="w-full flex justify-center">
            <div className="max-w-150 w-full">
              <Accordion items={faq}/>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
      
    </>
  );
}