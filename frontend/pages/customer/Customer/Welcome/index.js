import WelcomeSection from '../../../../components/WelcomeSection';

const Welcome = ({ ftMetadata, programIsActive, merchantAddress }) => {
  return (
    <WelcomeSection>
      {merchantAddress && 'Loyalty Program'}
      {merchantAddress && (programIsActive ? ftMetadata.token_name : `You don't have a loyalty program yet`)}
      {programIsActive || 'Log in as a merchant to activate the loyalty program. These are the programs already created:'}
    </WelcomeSection>
  );
};

export default Welcome;
