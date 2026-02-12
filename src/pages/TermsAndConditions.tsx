import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SiteFooter } from '@/components/ui/SiteFooter';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EAEAEA] text-[#0A0A0A] font-sans">
      {/* Sticky Back Home pill - desktop only */}
      <Link
        to="/"
        className="hidden lg:flex fixed top-8 right-8 z-50 items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium shadow-lg hover:opacity-90 transition-opacity"
      >
        <ArrowLeft size={16} />
        Back Home
      </Link>

      {/* Header */}
      <header className="py-8 md:py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1400px] mx-auto">
          <Link to="/" className="inline-block">
            <Logo className="w-32 md:w-40 h-auto" />
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
        <div className="max-w-[800px] mx-auto prose-content">
          <h1>Terms and Conditions</h1>
          <p><strong>Last Updated: February 12, 2026</strong></p>

          <h2>1. Agreement to Terms</h2>
          <p>These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you" or "Client") and <strong>Filtroo Oü</strong> ("Filtroo", "we," "us," or "our"), concerning your access to and use of the https://aitoma.ai/ website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto (collectively, the "Site"). Filtroo Oü is the legal entity that owns and operates the <strong>Aitoma</strong> brand and provides its services.</p>
          <p>You agree that by accessing the Site and our Services, you have read, understood, and agree to be bound by all of these Terms and Conditions. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS AND CONDITIONS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND OUR SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</p>
          <p>Supplemental terms and conditions or documents that may be posted on the Site from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Terms and Conditions at any time and for any reason.</p>

          <h2>2. Our Services</h2>
          <p>Aitoma provides strategic consulting and implementation services to help businesses integrate artificial intelligence. Our services include, but are not limited to:</p>
          <ul>
            <li><strong>Intelligent Operations:</strong> Designing and implementing self-managing operational systems.</li>
            <li><strong>Creative Systems:</strong> Developing AI-powered content creation and brand voice solutions.</li>
            <li><strong>Training & Adoption:</strong> Providing workshops and training for human-AI team integration.</li>
            <li><strong>Custom Architecture:</strong> Designing and developing bespoke AI systems and infrastructure.</li>
          </ul>
          <p>The specific scope of services, deliverables, timelines, and fees for any engagement will be detailed in a separate, written Statement of Work (SOW) or client agreement signed by both parties.</p>

          <h2>3. Intellectual Property Rights</h2>
          <p>Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.</p>
          <p>For services rendered, the intellectual property rights for any custom systems, code, or materials developed specifically for a Client ("Deliverables") will be outlined in the applicable SOW. Unless otherwise agreed in writing, upon full payment for the services, the Client will be granted a license to use the Deliverables for their internal business purposes. We retain the right to use our general knowledge, skills, experience, and any pre-existing intellectual property in the course of providing our services.</p>

          <h2>4. Client Responsibilities and Representations</h2>
          <p>By using the Site and our Services, you represent and warrant that:</p>
          <ol>
            <li>All registration and contact information you submit will be true, accurate, current, and complete.</li>
            <li>You have the legal capacity and you agree to comply with these Terms and Conditions.</li>
            <li>You will not use the Site or Services for any illegal or unauthorized purpose.</li>
            <li>You will provide us with timely access to necessary personnel, data, and systems required for us to perform the Services as outlined in the SOW.</li>
            <li>You have the necessary rights and permissions to provide us with any data or materials shared in the course of our engagement.</li>
          </ol>

          <h2>5. Fees and Payment</h2>
          <p>Fees for our Services will be set forth in the applicable SOW or client agreement. Unless otherwise specified, payment terms will be detailed in the invoices we provide. We reserve the right to suspend or terminate services for failure to pay invoices in a timely manner.</p>

          <h2>6. Term and Termination</h2>
          <p>These Terms and Conditions shall remain in full force and effect while you use the Site or are a client. The term and termination conditions for specific service engagements will be governed by the SOW or client agreement. We reserve the right to, in our sole discretion and without notice or liability, deny access to and use of the Site and our Services to any person for any reason or for no reason.</p>

          <h2>7. Disclaimers</h2>
          <p>THE SITE AND OUR SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p>WE DO NOT WARRANT THAT THE RESULTS OF OUR SERVICES WILL MEET YOUR REQUIREMENTS OR THAT THE OPERATION OF ANY DELIVERABLES WILL BE UNINTERRUPTED OR ERROR-FREE. THE FIELD OF ARTIFICIAL INTELLIGENCE IS RAPIDLY EVOLVING, AND WE DO NOT GUARANTEE ANY SPECIFIC BUSINESS OUTCOMES.</p>

          <h2>8. Limitation of Liability</h2>
          <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE OR OUR SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
          <p>NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL TIMES BE LIMITED TO THE AMOUNT PAID, IF ANY, BY YOU TO US DURING THE SIX (6) MONTH PERIOD PRIOR TO ANY CAUSE OF ACTION ARISING.</p>

          <h2>9. Governing Law and Jurisdiction</h2>
          <p>These Terms and Conditions and your use of the Site and Services are governed by and construed in accordance with the laws of the Republic of Estonia applicable to agreements made and to be entirely performed within the Republic of Estonia, without regard to its conflict of law principles. Any legal action or proceeding arising under these Terms and Conditions will be brought exclusively in the courts located in Tallinn, Estonia, and the parties hereby irrevocably consent to the personal jurisdiction and venue therein.</p>

          <h2>10. Miscellaneous</h2>
          <p>These Terms and Conditions and any policies or operating rules posted by us on the Site or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Terms and Conditions shall not operate as a waiver of such right or provision.</p>

          <h2>11. Contact Us</h2>
          <p>In order to resolve a complaint regarding the Site or our Services, or to receive further information regarding use of the Site, please contact us at:</p>
          <p><strong>Filtroo Oü</strong><br />Tööstuse tn 48, 10416<br />Põhja-Tallinna linnaosa, Tallinn<br />Estonia</p>
          
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default TermsAndConditions;
