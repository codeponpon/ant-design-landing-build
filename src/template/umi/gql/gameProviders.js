import gql from 'graphql-tag';

export const GAME_PROVIDERS = gql`
  query {
    gameProviders {
      name
      shortName
      gameType
      UM
      comingSoon
      imagePath
      iframable
      games {
        gameCode
        gameName
        type
        imagePath
      }
    }
  }
`;
