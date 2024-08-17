import { FoundUserComponent } from './components/found-user';
import { LoadingComponent } from '@components/loading';

export type SearchProps = {
    users: FoundUserComponent[],
    loading: LoadingComponent,
    isLoading: boolean,
    onFoundItemCLick: (userId: string) => void
}
