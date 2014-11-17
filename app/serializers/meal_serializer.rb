class MealSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :ingredients, each_serializer: IngredientSerializer
end
