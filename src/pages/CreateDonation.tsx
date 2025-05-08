
import React from 'react';
import Layout from '@/components/layout/Layout';
import DonationForm from '@/components/donations/DonationForm';

const CreateDonation: React.FC = () => {
  return (
    <Layout>
      <div className="page-container">
        <DonationForm />
      </div>
    </Layout>
  );
};

export default CreateDonation;
