import React, { Component } from 'react';
interface AdData {
    title: string;
    description: string;
    price: number;
    dateCreated: string;
    dateModified: string;
    city: string;
    address: string;
    currency: string;
    adType: string;
    categoryId: number;
    subCategoryId: number;
    pathToPhotos: string;
    userId: number;
}


interface PageByTypeProps {}
interface PageByTypeState {
ads: AdData[];
isLoading: boolean;
}

export class PageByType extends Component<PageByTypeProps, PageByTypeState> {
constructor(props: PageByTypeProps) {
    super(props);
    this.state = {
    ads: [],
    isLoading: true,
    };
}

async componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const categories = params.get('categories'); // Assuming query looks like ?categories=technic,phones

    if (categories) {
    try {
        const response = await fetch(`/api/Ad/AllAd/ByQuery?categories=${categories}`);
        const data: AdData[] = await response.json();
        this.setState({ ads: data, isLoading: false });
    } catch (error) {
        console.error("Failed to fetch data:", error);
        this.setState({ isLoading: false });
    }
    }
}

render() {
    const { ads, isLoading } = this.state;

    if (isLoading) {
    return <div>Loading...</div>;
    }

    return (
    <div>
        {ads.map(ad => (
        <div key={ad.title}>
            <h3>{ad.title}</h3>
            <p>{ad.description}</p>
            {/* You can render other fields as required */}
        </div>
        ))}
    </div>
    );
}
}

export default PageByType;
