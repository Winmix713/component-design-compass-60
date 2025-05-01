// Add new search component
    import React from 'react';
    import { Input, Modal, ModalContent, ModalBody, Card, CardBody } from '@heroui/react';
    import { Icon } from '@iconify/react';
    import { Link } from 'react-router-dom';
    import { cn } from '../../utils/cn';
    import algoliasearch from 'algoliasearch/lite';
    import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch';

    // This would be replaced with your actual Algolia credentials
    const searchClient = algoliasearch(
      'latency',
      '6be0576ff61c053d5f9a3225e2a90f76'
    );

    interface SearchProps {
      className?: string;
      placeholder?: string;
    }

    export const Search: React.FC<SearchProps> = ({
      className,
      placeholder = 'Search documentation...',
    }) => {
      const [isOpen, setIsOpen] = React.useState(false);
      
      const openSearch = () => setIsOpen(true);
      const closeSearch = () => setIsOpen(false);
      
      // Handle keyboard shortcut to open search
      React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            setIsOpen(prev => !prev);
          }
          
          if (e.key === 'Escape' && isOpen) {
            closeSearch();
          }
        };
        
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [isOpen]);
      
      const Hit = ({ hit }: any) => (
        <Link to={hit.path} onClick={closeSearch}>
          <Card className="mb-2 hover:bg-default-100">
            <CardBody className="py-2 px-4">
              <h4 className="font-medium">{hit.title}</h4>
              <p className="text-sm text-default-500">{hit.description}</p>
            </CardBody>
          </Card>
        </Link>
      );
      
      return (
        <>
          <div 
            className={cn("relative", className)}
            onClick={openSearch}
          >
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[20rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-100 dark:bg-default-50",
              }}
              placeholder={placeholder}
              size="sm"
              startContent={<Icon icon="lucide:search" width={18} />}
              endContent={
                <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-default-500 bg-default-200 rounded-md">
                  ⌘K
                </kbd>
              }
              type="search"
              readOnly
            />
          </div>
          
          <Modal 
            isOpen={isOpen} 
            onOpenChange={setIsOpen}
            placement="top"
            size="3xl"
            scrollBehavior="inside"
          >
            <ModalContent>
              {() => (
                <ModalBody className="p-0">
                  <InstantSearch searchClient={searchClient} indexName="instant_search">
                    <Configure hitsPerPage={8} />
                    <SearchBox
                      placeholder="Search documentation..."
                      classNames={{
                        root: 'p-4 border-b border-divider',
                        form: 'relative',
                        input: 'w-full py-2 pl-10 pr-4 rounded-lg border border-default-300 focus:outline-none focus:ring-2 focus:ring-primary',
                        submit: 'hidden',
                        reset: 'hidden',
                        loadingIndicator: 'hidden',
                      }}
                      autoFocus
                    />
                    <div className="p-4">
                      <Hits hitComponent={Hit} />
                    </div>
                  </InstantSearch>
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </>
      );
    };