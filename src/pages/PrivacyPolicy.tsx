import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { SiteFooter } from '@/components/ui/SiteFooter';

const PrivacyPolicy: React.FC = () => {
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
          <h1>Privacy Policy</h1>
          <p><strong>Last Updated: February 12, 2026</strong></p>

          <h2>1. Introduction</h2>
          <p>Welcome to Aitoma ("Aitoma", "we", "us", or "our"). Aitoma is an intelligence lab that partners with businesses to architect and implement intelligent systems. Our services are managed and operated by our parent company, <strong>Filtroo Oü</strong>.</p>
          <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, https://aitoma.ai/ (the "Website"), and when you use our services (the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.</p>
          <p>We are committed to protecting your personal data and respecting your privacy in compliance with applicable laws, including the General Data Protection Regulation (GDPR).</p>

          <h2>2. Data Controller</h2>
          <p>For the purpose of the GDPR, the data controller is:</p>
          <p><strong>Filtroo Oü</strong><br />Tööstuse tn 48, 10416<br />Põhja-Tallinna linnaosa, Tallinn<br />Estonia</p>
          <p>Any inquiries regarding this policy or your data can be directed to the contact information provided at the end of this document.</p>

          <h2>3. Information We Collect</h2>
          <p>We may collect information about you in a variety of ways. The information we may collect on the Website and through our Services includes:</p>

          <h3>Personal Data You Provide to Us</h3>
          <p>We collect personal data that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us. The personal data that we collect depends on the context of your interactions with us and the Website, but may include the following:</p>
          <ul>
            <li><strong>Contact Information:</strong> such as your first and last name, email address, phone number, and company name.</li>
            <li><strong>Communications:</strong> such as information you provide when you contact us for a consultation or for support.</li>
          </ul>

          <h3>Data We Collect Automatically</h3>
          <p>When you visit our Website, we may automatically collect certain information from your device. This information may include:</p>
          <ul>
            <li><strong>Log and Usage Data:</strong> such as your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits.</li>
            <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track the activity on our Website and hold certain information. For further information, please see our "Cookies and Tracking Technologies" section below.</li>
          </ul>

          <h3>Data Processed on Behalf of Our Clients</h3>
          <p>In providing our Services, we may process data that our clients provide to us. In this context, Aitoma acts as a <strong>Data Processor</strong> and our client acts as the <strong>Data Controller</strong>. The data processed may include business data, operational metrics, customer information, and other data necessary to design, build, and deploy our intelligent systems. Our processing of this data is governed by the terms of our service agreements with our clients.</p>

          <h2>4. How We Use Your Information</h2>
          <p>We use the information we collect or receive for the following purposes:</p>
          <ul>
            <li><strong>To Provide and Manage Our Services:</strong> To enter into and perform our contract with you or your company, including creating and managing your account, providing customer support, and delivering the services you have requested.</li>
            <li><strong>To Respond to Inquiries and Offer Support:</strong> To respond to your inquiries, and solve any potential issues you might have with the use of our Services.</li>
            <li><strong>For Business and Operational Purposes:</strong> To analyze website usage, improve our Website and Service offerings, and for other internal business purposes.</li>
            <li><strong>To Send Administrative and Marketing Communications:</strong> We may use your personal information to send you product, service, and new feature information and/or information about changes to our terms, conditions, and policies. We may also use your information for our marketing purposes, if this is in accordance with your marketing preferences.</li>
            <li><strong>To Protect Our Services:</strong> To keep our Website and Services safe and secure (for example, for fraud monitoring and prevention).</li>
          </ul>

          <h2>5. Legal Basis for Processing (GDPR)</h2>
          <p>If you are from the European Economic Area (EEA), our legal basis for collecting and using the personal information described above will depend on the personal information concerned and the specific context in which we collect it.</p>
          <ul>
            <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose (e.g., marketing communications).</li>
            <li><strong>Performance of a Contract:</strong> We may process your personal information when it is necessary for the performance of a contract to which you are a party or in order to take steps at your request before entering into such a contract.</li>
            <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests, such as for improving our services and for analytics, provided that your interests and fundamental rights do not override those interests.</li>
            <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
          </ul>

          <h2>6. Data Sharing and Disclosure</h2>
          <p>We do not sell your personal information. We may share your information with third parties that perform services for us or on our behalf, including data analysis, hosting services, and customer service. These third parties are contractually obligated to protect your data.</p>

          <h2>7. Data Retention</h2>
          <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).</p>

          <h2>8. Your Data Protection Rights under GDPR</h2>
          <p>If you are a resident in the EEA, you have the following data protection rights:</p>
          <ul>
            <li>The right to <strong>access, update, or delete</strong> the information we have on you.</li>
            <li>The right of <strong>rectification</strong>.</li>
            <li>The right to <strong>object</strong> to our processing of your personal data.</li>
            <li>The right of <strong>restriction</strong>.</li>
            <li>The right to <strong>data portability</strong>.</li>
            <li>The right to <strong>withdraw consent</strong> at any time.</li>
          </ul>
          <p>You may exercise any of these rights by contacting us using the details provided below.</p>

          <h2>9. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy (if applicable) or can be managed through your browser settings.</p>

          <h2>10. International Data Transfers</h2>
          <p>Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. As we are based in Estonia, we comply with GDPR requirements for any transfers of data outside the EEA.</p>

          <h2>11. Security of Your Information</h2>
          <p>We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.</p>

          <h2>12. Changes to This Privacy Policy</h2>
          <p>We may update this privacy policy from time to time. The updated version will be indicated by an updated "Last Updated" date and the updated version will be effective as soon as it is accessible. We encourage you to review this privacy policy frequently to be informed of how we are protecting your information.</p>

          <h2>13. Contact Us</h2>
          <p>If you have questions or comments about this policy, you may contact us at:</p>
          <p><strong>Filtroo Oü</strong><br />Tööstuse tn 48, 10416<br />Põhja-Tallinna linnaosa, Tallinn<br />Estonia</p>
          
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default PrivacyPolicy;
