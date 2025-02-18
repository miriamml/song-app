import Song from '../../song/entity/song.entity';

/**
 * Represents each song registered in the platform
 *
 * @author Miriam Martin Luna <miriam_ml_10@hotmail.es>
 */
export default class Artist {
    id: string|null = null
    name: string = ''
    bornCity: string = ''
    birthdate: Date = new Date();
    img: string|null = null
    rating: number = 0

  /**
   * Id of the song
   */
  song: number[]|null = null
}
