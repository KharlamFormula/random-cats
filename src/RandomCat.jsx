import React, { Component } from "react";
import axios from "axios";

class RandomCat extends Component {
  state = {
    cats: [],
    currentCat: "",
    showHearts: false,
    loading: true
  };

  componentDidMount() {
    axios
      .get("https://cataas.com/api/cats?tags=cute")
      .then((response) => {
        const cats = response.data;
        this.setState({ cats, loading: false }, this.pickRandomCat);
      })
  }

  pickRandomCat = () => {
    const { cats } = this.state;

    if (!cats || cats.length === 0) return;

    this.setState({ showHearts: false }); 

    const randomIndex = Math.floor(Math.random() * cats.length);
    const catId = cats[randomIndex].id;
    const photoUrl = `https://cataas.com/cat/${catId}`;

    this.setState({ currentCat: photoUrl });

    setTimeout(() => {
      this.setState({ showHearts: true });
    }, 150);
  };

  render() {
    const { currentCat, showHearts, loading } = this.state;

    return (
      <div className="cat-card">
        <h1 className="title">😺 Cute Random Cats</h1>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <div className="cat-wrapper">
            <img className="cat-img" src={currentCat} alt="Cute cat" />

            {showHearts && (
              <div className="hearts">
                <span>❤️</span>
                <span>💗</span>
                <span>💕</span>
                <span>💖</span>
                <span>💞</span>
              </div>
            )}
          </div>
        )}

        <button className="btn-change" onClick={this.pickRandomCat}>
          Next cat 🐾
        </button>
      </div>
    );
  }
}

export default RandomCat;
