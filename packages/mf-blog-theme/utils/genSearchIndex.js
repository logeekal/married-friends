"use strict";
exports.__esModule = true;
exports.genSearchIdx = exports.genIndexableRecipe = void 0;
var striptags = require("striptags");
var lunr = require("lunr");
function genIndexableRecipe(recipes) {
    var allRecipes = Object.values(recipes);
    var indexableRecipe = {};
    var allIndexableRecipes = allRecipes.map(function (recipe) {
        indexableRecipe["id"] = recipe.post.databaseId;
        indexableRecipe["content"] = sanitizeTextsForSearch(recipe.post.content);
        indexableRecipe["instructions"] = combineInstruction(recipe.content.recipeInstructions);
        indexableRecipe["ingredients"] = combineIngredient(recipe.content.recipeIngredients);
        return indexableRecipe;
    });
    return allIndexableRecipes;
}
exports.genIndexableRecipe = genIndexableRecipe;
function genSearchIdx(recipes) {
    var indexableRecipes = genIndexableRecipe(recipes);
    return lunr(function () {
        var _this = this;
        this.ref("id");
        this.field("content");
        //this.field("instructions");
        //this.field("ingredients");
        indexableRecipes.forEach(function (indexableRecipe) {
            _this.add(indexableRecipe);
        });
    });
}
exports.genSearchIdx = genSearchIdx;
function sanitizeTextsForSearch(text) {
    return striptags(text);
}
function combineInstruction(instruction) {
    return instruction.reduce(function (prev, current) {
        var result = "";
        current.instruction.forEach(function (item) {
            result = result + sanitizeTextsForSearch(item.instruction) + "\n";
        });
        return prev + result;
    }, "");
}
function combineIngredient(ingredients) {
    return ingredients.reduce(function (prev, current) {
        var result = "";
        current.ingredients.forEach(function (item) {
            result = result + +item.quantity + item.unit + item.ingredient + "\n";
        });
        return prev + result;
    }, "");
}
