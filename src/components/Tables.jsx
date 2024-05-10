import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from '@table-library/react-table-library/table';
import { useTheme } from '@table-library/react-table-library/theme';

import { axiosInstance, imageBaseUrl } from '../utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchTopRatedMovies = async () => {
  const response = await axiosInstance.get('/movie/top_rated', {
    params: {
      language: 'en-US',
      page: 1,
    },
  });
  return response.data; // Return the data from the response
};


const Tables = () => {
  const theme = useTheme({
    HeaderRow: `
        background-color: black;
      `,
    Row: `background-color: black`,

    BaseCell: `text-align: center; 

    padding: 12px;
    
       & > div {
          display: flex;
          align-items: center
        }
       

    &:first-of-type {
          text-align: left;
        }`,
  });
  const { data, error, isLoading } = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: fetchTopRatedMovies,
  });
  const nodes = data?.results || [];
  const tableData = { nodes };
 
  return (
    <div>
      {isLoading && 'loading'}
      <Table data={tableData} theme={theme} className='text-xs'>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow>
                <HeaderCell>Title</HeaderCell>
                <HeaderCell>Views</HeaderCell>
                <HeaderCell>Rating</HeaderCell>
                <HeaderCell>Market Cap</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => (
                <Row key={item.id} item={item}>
                  <Cell>
                    <img
                      src={`${imageBaseUrl}${item.backdrop_path}`}
                      alt='image'
                      className='w-8 h-8 rounded mr-2'
                    />
                    {item.title}
                  </Cell>
                  <Cell>{`${Math.ceil(item.popularity)} M`}</Cell>
                  <Cell>{item.vote_average.toFixed(1)}</Cell>
                  <Cell>{item.vote_count}</Cell>
                  <Cell>
                    <button className='py-2 px-4 bg-[#5C006A] rounded-md'>
                      Trade
                    </button>
                  </Cell>
                </Row>
              ))}
            </Body>
          </>
        )}
      </Table>
    </div>
  );
};

export default Tables;
