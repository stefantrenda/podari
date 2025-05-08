
import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <h1 className="section-title">За Добар Сосед</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg">
            Добар Сосед е платформа која ги поврзува луѓето кои сакаат да донираат предмети со оние на кои им се потребни.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">Нашата мисија</h2>
          <p>
            Нашата мисија е да создадеме поврзана заедница каде што луѓето можат лесно да споделуваат и да помагаат
            едни на други, намалувајќи го отпадот и промовирајќи одржлив начин на живот.
          </p>
          
          <h2 className="text-xl font-bold mt-8 mb-4">Како функционира</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Регистрирајте се на платформата</li>
            <li>Додајте предмети кои сакате да ги донирате</li>
            <li>Поврзете се со луѓе кои се заинтересирани за вашите донации</li>
            <li>Организирајте предавање на предметите</li>
          </ol>
          
          <h2 className="text-xl font-bold mt-8 mb-4">Контакт</h2>
          <p>
            За сите прашања или сугестии, контактирајте нѐ на: 
            <a href="mailto:contact@dobarsosed.mk" className="text-primary hover:underline ml-1">
              contact@dobarsosed.mk
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
