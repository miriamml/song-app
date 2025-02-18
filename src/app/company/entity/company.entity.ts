import Song from '../../song/entity/song.entity';

/**
 * Represents each song registered in the platform
 *
 * @author Miriam Martin Luna <miriam_ml_10@hotmail.es>
 */
export default class Company {
    id: string|null = null
    name: string = ''
    country: string = ''
    createYear: number = new Date().getFullYear()
    employees: number = 0;
    rating: number = 0

  /**
   * Id of the song
   */
  song: number[]|null = null
}
