import { gql } from 'apollo-boost'

export const LAUNCH_GAMES = gql`
  query launchGames(
    $provider: String
    $isMobile: Boolean
    $gameCode: String
    $redirectUrl: String
  ) {
    launchGame(
      provider: $provider
      isMobile: $isMobile
      gameCode: $gameCode
      redirectUrl: $redirectUrl
    ) {
      url
    }
  }
`
