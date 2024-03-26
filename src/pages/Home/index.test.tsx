import '@testing-library/jest-dom/vitest'
import { vi, describe, it, expect, beforeEach, afterAll } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as ReactQuery from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { MainState } from '@src/context'
import { lang } from '@src/fakeI18n/main'
import { Home } from '.'

vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof ReactQuery>()
  return {
    ...actual,
    useQueries: vi.fn(() => [
      {
        isLoading: false,
        data: {
          results: [
            {
              adult: false,
              backdrop_path: '/deLWkOLZmBNkm8p16igfapQyqeq.jpg',
              genre_ids: [14, 28, 12],
              id: 763215,
              original_language: 'en',
              original_title: 'Damsel',
              overview:
                "A young woman's marriage to a charming prince turns into a fierce fight for survival when she's offered up as a sacrifice to a fire-breathing dragon.",
              popularity: 1663.423,
              poster_path: '/sMp34cNKjIb18UBOCoAv4DpCxwY.jpg',
              release_date: '2024-03-08',
              title: 'Damsel',
              video: false,
              vote_average: 7.2,
              vote_count: 1175,
            },
          ],
        },
      },
      {
        isLoading: false,
        data: {
          results: [
            {
              adult: false,
              backdrop_path: '/kbLnQnbu8rygcqP9hhCaDdNcbEF.jpg',
              genre_ids: [16],
              id: 5579,
              origin_country: ['AE'],
              original_language: 'ar',
              original_name: 'فريج',
              overview:
                'The first Emirati animated series recounts the adventures of four old women living in a secluded neighbourhood in modern-day Dubai.',
              popularity: 2852.346,
              poster_path: '/ttiiwKozgWVQNnHtzvORPd7PyFc.jpg',
              first_air_date: '2006-09-23',
              name: 'Freej',
              vote_average: 7.5,
              vote_count: 2,
            },
          ],
        },
      },
    ]),
  }
})

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <MainState.Provider
          value={{
            state: { lang: 'fr', idFavoritesList: [], isModalOpen: false },
            dispatch: vi.fn(),
          }}
        >
          <Home />
        </MainState.Provider>
      </MemoryRouter>,
    )

    expect(screen.getByText('Damsel')).toBeVisible()

    expect(screen.getByText(lang['fr'].topRatedMovie)).toBeVisible()
    expect(screen.getByText(lang['fr'].topRatedSeries)).toBeVisible()
  })
})
