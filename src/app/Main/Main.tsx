import './style.css';

export default function Main() {
  return (
  <div>
    <div className="header">
      <div className="container">
      <div className="header-content">
        <h1>Where Savings Sparkle</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <button className="button signup"><a href="register.html">Join Us</a></button>
      </div>
    </div>
    
  </div>
  <div className="content content-main">
    <div className="container">
      <h1 className='m-auto'>Spend with joy!</h1>
      <p className='m-auto'>Spend with joy, save with ease — making every moment brighter and every penny count!</p>
      <div className="image-container">
        <img src="img/mymelo.png" alt="mymelo" />
        <img className="bg" src="img/bg.jpg" alt="bg" />
        <img src="img/kuromi.png" alt="kuromi" />
      </div>
    </div>
  </div>
    </div>
  );
}