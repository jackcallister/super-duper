class MealSerializer < ActiveModel::Serializer
  attributes :id, :name, :category
  has_many :ingredients, each_serializer: IngredientSerializer
end
