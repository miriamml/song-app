import {Country} from '@wlucha/ng-country-select';

/**
 * Represents each song registered in the platform
 *
 * @author Miriam Martin Luna <miriam_ml_10@hotmail.es>
 */
export default class Song {
  id: string|null = null
  title: string = ''
  poster: string = ''
  genre: string[] = []
  year: number = 0
  duration: number = 0
  rating: number = 0

  /**
   * Id of the artist
   */
  artist: number|null = null
  companies: number[] = []
  country = ''
}
