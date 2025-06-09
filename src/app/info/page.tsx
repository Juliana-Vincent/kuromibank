import './style.css';
import Accordion from '../../../components/Accordion';
import PageWrapper from '../../../components/AnimationPresence';

const faq = [
  { title: 'How secure is my money with Sanrio Bank?', content: 'Your safety is our top priority. Sanrio Bank uses bank-level encryption, two-factor authentication, and secure servers to keep your funds and data protected — all wrapped in a sweet, user-friendly experience.' },
  { title: 'Can I open an account if I’m new to banking?', content: 'Absolutely! Our sign-up is easy and welcoming — no experience needed. We’ll guide you step by step, like a trusted friend, and help you build healthy saving habits from day one.' },
  { title: ' Is Sanrio Bank for kids?', content: 'We’re designed for young hearts, but we’re a real bank for real people. Whether you’re 18 or 80, if you love joyful design and smart money tools, you’re in the right place!' },
  { title: 'How do I send money to a friend?', content: 'It’s super simple! Just head to your dashboard, enter your friend’s phone number, choose the amount, and tap Send. They’ll receive it instantly — quick, easy, and secure.'}
];

export default function Info(){
  
  return (
    <>
    <PageWrapper>
      <div className="header header-info">
        <div className="container">
          <div className="header-content">
            <h1>Feel free to ask!</h1>
            <p>Whether you're curious about how to save, spend, or sparkle, we’re always happy to guide you. Your comfort and confidence matter to us — no question is too small!</p>
            <p className='pFaqs'>↓ Scroll down for FAQs ↓</p>
          </div>
        </div>
      </div>
      
      <div className="content">
        <div className="container">
          <div className="w-full flex justify-center pt-28 pb-5">
            <h2 className='text-white text-5xl font-bold mb-8'>Frequently Asked Questions</h2>
          </div>
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