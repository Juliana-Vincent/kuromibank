import PageWrapper from "../../../components/AnimationPresence";

export default function Contact(){
  return (
    <>
    <PageWrapper>
      <div className="header header-contacts">
        <div className="container">
          <div className="header-content">
            <h1 className="h1Contacts">We’re Here Whenever You Need Us</h1>
            <p className="pt-40">Have a question, a concern, or just want to say hi? Our team is always happy to help — with kindness, care, and a sprinkle of magic.</p>
            <div className="self-baseline-last">
              <h2 className="h2Contacts">Get in Touch</h2>
              <ul>
                <li><strong>💌 Email:</strong> support@sanriobank.com (Replies within 24 hours)</li>
                <li><strong>📞 Phone:</strong> 1-800-SANRIOB (Mon–Fri, 9am–6pm)</li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>
    </PageWrapper>
      
    </>
  );
}